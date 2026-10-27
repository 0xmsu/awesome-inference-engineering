// Extracts links from the upstream lists in data/sources.yml and marks which ones we already have.
// Usage: node scripts/extract-links.ts [--source <id>] [--new-only] [--json] [--watched]
//   --new-only  only links that are not in data/ yet
//   --json      machine-readable output instead of Markdown
//   --watched   only sources with `watch: true` (used by the monthly upstream-watch job)

import { loadDataset, normalizeUrl, type Source } from "./lib/data.ts";
import { extractLinks } from "./lib/links.ts";

interface Candidate {
  source: string;
  heading: string;
  text: string;
  url: string;
  known: boolean;
}

const args = process.argv.slice(2);
const only = args.includes("--source") ? args[args.indexOf("--source") + 1] : undefined;
const newOnly = args.includes("--new-only");
const asJson = args.includes("--json");
const watched = args.includes("--watched");

async function readme(src: Source): Promise<string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.raw",
    "User-Agent": "awesome-inference-engineering",
  };
  const tok = process.env["GITHUB_TOKEN"] ?? process.env["GH_TOKEN"];
  if (tok) headers["Authorization"] = `bearer ${tok}`;
  const res = await fetch(`https://api.github.com/repos/${src.repo}/readme`, { headers });
  if (!res.ok) throw new Error(`${src.repo}: README fetch failed (${res.status})`);
  return res.text();
}

const ds = loadDataset();
const known = new Set(ds.entries.flatMap((e) => [e.url, ...(e.paper?.code ? [e.paper.code] : [])]).map(normalizeUrl));
const sources = ds.sources.filter((s) => (!only || s.id === only) && (!watched || s.watch));

const candidates: Candidate[] = [];
for (const src of sources) {
  const seen = new Set<string>();
  for (const link of extractLinks(await readme(src))) {
    const norm = normalizeUrl(link.url);
    if (seen.has(norm) || norm.startsWith(`github.com/${src.repo.toLowerCase()}`)) continue;
    seen.add(norm);
    candidates.push({ source: src.id, ...link, known: known.has(norm) });
  }
}

const shown = newOnly ? candidates.filter((c) => !c.known) : candidates;
if (asJson) {
  console.log(JSON.stringify(shown, null, 2));
} else {
  for (const src of sources) {
    const rows = shown.filter((c) => c.source === src.id);
    console.log(`## ${src.name} (${rows.length} ${newOnly ? "new " : ""}links)\n`);
    for (const c of rows) console.log(`- [${c.known ? "x" : " "}] ${c.heading ? `**${c.heading}** · ` : ""}[${c.text}](${c.url})`);
    console.log("");
  }
}
