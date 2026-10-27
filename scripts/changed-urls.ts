// Prints URLs that are new or changed compared with a git ref, one per line (input for lychee).
// Usage: node scripts/changed-urls.ts <base-ref>
//        node scripts/changed-urls.ts --all      (every URL in data/, for the weekly full check)

import { execFileSync } from "node:child_process";
import { parse } from "yaml";
import { ROOT, loadDataset, normalizeUrl, type Entry } from "./lib/data.ts";

function urlsOf(entries: Entry[]): string[] {
  return entries.flatMap((e) => [e.url, ...(e.paper?.code ? [e.paper.code] : [])]);
}

function git(...args: string[]): string {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
}

const base = process.argv[2];
if (!base) {
  console.error("Usage: node scripts/changed-urls.ts <base-ref> | --all");
  process.exit(1);
}
if (base === "--all") {
  console.log([...new Set(urlsOf(loadDataset().entries))].join("\n"));
  process.exit(0);
}

const baseUrls = new Set<string>();
let files: string[] = [];
try {
  files = git("ls-tree", "--name-only", `${base}:data/entries`).split("\n").filter((f) => f.endsWith(".yml"));
} catch {
  // The base ref has no data yet: everything is new.
}
for (const f of files) {
  const parsed = parse(git("show", `${base}:data/entries/${f}`)) as Entry[] | null;
  for (const u of urlsOf(parsed ?? [])) baseUrls.add(normalizeUrl(u));
}

const changed = [...new Set(urlsOf(loadDataset().entries))].filter((u) => !baseUrls.has(normalizeUrl(u)));
if (changed.length) console.log(changed.join("\n"));
