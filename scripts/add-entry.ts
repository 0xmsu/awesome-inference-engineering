// Appends a new entry skeleton to the right data file, prefilled from GitHub when possible.
// Usage: node scripts/add-entry.ts <url> --section <h2/h3> [--type tool] [--name "Name"] [--via source-id]
// The description is left as a TODO on purpose: descriptions must be written in your own words.

import { appendFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { stringify } from "yaml";
import { ROOT, loadDataset, normalizeUrl, repoOf, sectionRefs, topSection, type Entry } from "./lib/data.ts";

function flag(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const url = process.argv[2];
const section = flag("section");
if (!url || url.startsWith("--") || !section) {
  console.error("Usage: pnpm add-entry <url> --section <h2/h3> [--type tool] [--name Name] [--via source-id]");
  process.exit(1);
}

const ds = loadDataset();
if (!sectionRefs(ds.taxonomy).has(section)) {
  console.error(`Unknown section "${section}". Valid sections:\n  ${[...sectionRefs(ds.taxonomy)].join("\n  ")}`);
  process.exit(1);
}
const existing = ds.entries.find((e) => normalizeUrl(e.url) === normalizeUrl(url));
if (existing) {
  console.error(`Already listed as "${existing.id}" in data/entries/${existing.file}.`);
  process.exit(1);
}

let name = flag("name");
let upstreamDescription: string | undefined;
const repo = repoOf({ url });
if (repo) {
  const headers: Record<string, string> = { "User-Agent": "awesome-inference-engineering" };
  const tok = process.env["GITHUB_TOKEN"] ?? process.env["GH_TOKEN"];
  if (tok) headers["Authorization"] = `bearer ${tok}`;
  const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
  if (res.ok) {
    const info = (await res.json()) as { name: string; description: string | null; archived: boolean };
    name ??= info.name;
    upstreamDescription = info.description ?? undefined;
    if (info.archived) console.warn("warning: this repository is archived upstream.");
  } else {
    console.warn(`warning: GitHub lookup failed (${res.status}); fill in the fields by hand.`);
  }
}
name ??= new URL(url).hostname;

const ids = new Set(ds.entries.map((e) => e.id));
let id = slugify(name) || "entry";
for (let n = 2; ids.has(id); n++) id = `${slugify(name)}-${n}`;

const entry: Partial<Entry> & { notes?: string } = {
  id,
  name,
  url,
  description: "TODO: describe in your own words.",
  section,
  type: (flag("type") as Entry["type"] | undefined) ?? "tool",
  tags: [],
  added: new Date().toISOString().slice(0, 10),
};
const via = flag("via");
if (via) entry.via = [via];
if (upstreamDescription) entry.notes = `Upstream description: ${upstreamDescription}`;

const file = join(ROOT, "data", "entries", `${topSection(section)}.yml`);
let current = "";
try {
  current = readFileSync(file, "utf8");
} catch {
  // New file.
}
appendFileSync(file, `${current && !current.endsWith("\n\n") ? "\n" : ""}${stringify([entry])}`);
console.log(`Added "${id}" to data/entries/${topSection(section)}.yml. Now write the description, set tags, and run pnpm check.`);
