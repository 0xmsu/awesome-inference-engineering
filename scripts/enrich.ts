// Fetches GitHub metadata for every repo-backed entry and writes data/generated/metadata.json.
// Usage: node scripts/enrich.ts [--fix-urls] [--report <file>]
//   --fix-urls  rewrite entry URLs for repositories that were renamed or transferred.
//   --report    also write a Markdown report (archived, stale, renamed, missing) to <file>.
// Needs GITHUB_TOKEN (falls back to `gh auth token` locally).

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT, loadDataset, repoOf, repoKey, type Metadata, type RepoMeta, type LoadedEntry } from "./lib/data.ts";

const BATCH = 50;
const STALE_DAYS = 365;
/** Only software and datasets go stale; an old paper, article, or spec hosted on a repo does not. */
const MAINTAINED_TYPES = new Set(["tool", "library", "service", "benchmark", "dataset", "hardware", "list"]);

function token(): string {
  const env = process.env["GITHUB_TOKEN"] ?? process.env["GH_TOKEN"];
  if (env) return env;
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
  } catch {
    throw new Error("Set GITHUB_TOKEN (or log in with `gh auth login`).");
  }
}

interface GqlRepo {
  nameWithOwner: string;
  stargazerCount: number;
  pushedAt: string | null;
  createdAt: string | null;
  isArchived: boolean;
  isFork: boolean;
  description: string | null;
  licenseInfo: { spdxId: string | null } | null;
  latestRelease: { tagName: string; publishedAt: string } | null;
}

const FIELDS = `nameWithOwner stargazerCount pushedAt createdAt isArchived isFork description
  licenseInfo { spdxId } latestRelease { tagName publishedAt }`;

async function fetchBatch(repos: string[], auth: string): Promise<Record<string, GqlRepo | null>> {
  const parts = repos.map((r, i) => {
    const [owner, name] = r.split("/");
    return `r${i}: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(name)}) { ${FIELDS} }`;
  });
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${auth}`, "Content-Type": "application/json", "User-Agent": "awesome-inference-engineering" },
    body: JSON.stringify({ query: `query { ${parts.join("\n")} }` }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { data?: Record<string, GqlRepo | null>; errors?: { type?: string; message: string }[] };
  const fatal = (json.errors ?? []).filter((e) => e.type !== "NOT_FOUND");
  if (fatal.length) throw new Error(`GitHub GraphQL errors: ${fatal.map((e) => e.message).join("; ")}`);
  const out: Record<string, GqlRepo | null> = {};
  repos.forEach((r, i) => (out[r] = json.data?.[`r${i}`] ?? null));
  return out;
}

function toMeta(r: GqlRepo): RepoMeta {
  return {
    nameWithOwner: r.nameWithOwner,
    stars: r.stargazerCount,
    pushedAt: r.pushedAt,
    createdAt: r.createdAt,
    archived: r.isArchived,
    isFork: r.isFork,
    license: r.licenseInfo?.spdxId ?? null,
    latestRelease: r.latestRelease ? { tag: r.latestRelease.tagName, publishedAt: r.latestRelease.publishedAt } : null,
    description: r.description,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const fixUrls = args.includes("--fix-urls");
  const reportIdx = args.indexOf("--report");
  const reportPath = reportIdx >= 0 ? args[reportIdx + 1] : undefined;

  const ds = loadDataset();
  const byRepo = new Map<string, LoadedEntry[]>();
  for (const e of ds.entries) {
    const repo = repoOf(e);
    if (!repo) continue;
    const list = byRepo.get(repo) ?? [];
    list.push(e);
    byRepo.set(repo, list);
  }
  const repos = [...byRepo.keys()].sort();
  const auth = token();
  const metadata: Metadata = { generatedAt: new Date().toISOString(), repos: {} };
  for (let i = 0; i < repos.length; i += BATCH) {
    const result = await fetchBatch(repos.slice(i, i + BATCH), auth);
    for (const [repo, r] of Object.entries(result)) metadata.repos[repoKey(repo)] = r ? toMeta(r) : { missing: true };
  }
  metadata.repos = Object.fromEntries(Object.entries(metadata.repos).sort(([a], [b]) => a.localeCompare(b)));

  const dir = join(ROOT, "data", "generated");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "metadata.json"), JSON.stringify(metadata, null, 2) + "\n");

  // Report.
  const now = Date.now();
  const archived: string[] = [];
  const stale: string[] = [];
  const renamed: { from: string; to: string; entries: LoadedEntry[] }[] = [];
  const missing: string[] = [];
  for (const repo of repos) {
    const meta = metadata.repos[repoKey(repo)];
    const ids = (byRepo.get(repo) ?? []).map((e) => e.id).join(", ");
    if (!meta || "missing" in meta) {
      missing.push(`- \`${repo}\` (${ids})`);
      continue;
    }
    const declared = (byRepo.get(repo) ?? []).some((e) => e.status === "archived" || e.status === "deprecated");
    if (meta.archived && !declared) archived.push(`- \`${repo}\` (${ids})`);
    const entries = byRepo.get(repo) ?? [];
    const needsMaintenance = entries.some((e) => MAINTAINED_TYPES.has(e.type)) && !entries.some((e) => e.status);
    if (needsMaintenance && !meta.archived && meta.pushedAt && now - Date.parse(meta.pushedAt) > STALE_DAYS * 86_400_000)
      stale.push(`- \`${repo}\` (${ids}) — last push ${meta.pushedAt.slice(0, 10)}`);
    if (meta.nameWithOwner.toLowerCase() !== repo.toLowerCase())
      renamed.push({ from: repo, to: meta.nameWithOwner, entries: byRepo.get(repo) ?? [] });
  }

  if (fixUrls) {
    for (const { from, to, entries } of renamed) {
      for (const file of new Set(entries.map((e) => e.file))) {
        const path = join(ROOT, "data", "entries", file);
        const text = readFileSync(path, "utf8")
          .replaceAll(`url: https://github.com/${from}\n`, `url: https://github.com/${to}\n`)
          .replaceAll(`repo: ${from}\n`, `repo: ${to}\n`);
        writeFileSync(path, text);
      }
    }
  }

  const sections = [
    ["Archived upstream (not yet marked in data)", archived],
    [`Stale tools not yet marked as maintenance (no push in ${STALE_DAYS} days)`, stale],
    [
      fixUrls ? "Renamed or transferred (URLs updated)" : "Renamed or transferred (run with --fix-urls)",
      renamed.map((r) => `- \`${r.from}\` → \`${r.to}\``),
    ],
    ["Missing (repository not found)", missing],
  ] as const;
  const report = [
    `# Metadata report`,
    "",
    `${repos.length} repositories checked on ${metadata.generatedAt?.slice(0, 10)}.`,
    "",
    ...sections.flatMap(([title, items]) => (items.length ? [`## ${title}`, "", ...items, ""] : [])),
  ].join("\n");
  console.log(report);
  if (reportPath) writeFileSync(reportPath, report);
}

await main();
