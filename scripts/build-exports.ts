// Builds machine-readable exports: api/entries.json, llms.txt, llms-full.txt.
// Usage: node scripts/build-exports.ts [--out <dir>]   (default: dist/)

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { ROOT, loadDataset, repoOf, repoMeta, effectiveStatus, isListed, type Dataset, type Entry, type LoadedEntry } from "./lib/data.ts";
import { SITE_URL, entriesFor } from "./lib/readme.ts";

const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const outDir = resolve(ROOT, outIdx >= 0 ? (args[outIdx + 1] ?? "dist") : "dist");

const ds = loadDataset();

function exportEntry(e: LoadedEntry) {
  const meta = repoMeta(e, ds.metadata);
  const { notes: _notes, file: _file, via: _via, ...rest } = e;
  return {
    ...rest,
    repo: repoOf(e),
    status: effectiveStatus(e, ds.metadata),
    license: e.license ?? (meta?.license && meta.license !== "NOASSERTION" ? meta.license : undefined),
    github: meta
      ? {
          stars: meta.stars,
          pushedAt: meta.pushedAt,
          createdAt: meta.createdAt,
          archived: meta.archived,
          latestRelease: meta.latestRelease,
        }
      : undefined,
  };
}

function entriesJson(d: Dataset) {
  return {
    name: "Awesome Inference Engineering",
    homepage: SITE_URL,
    license: "CC0-1.0",
    generatedAt: d.metadata.generatedAt,
    sections: d.taxonomy.sections.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description.trim(),
      subsections: (s.subsections ?? []).map((sub) => ({ id: `${s.id}/${sub.id}`, title: sub.title })),
    })),
    tags: d.tags,
    glossary: d.glossary,
    entries: d.entries.map(exportEntry),
  };
}

function line(e: Entry): string {
  return `- [${e.name}](${e.url}): ${e.description}`;
}

/** Sections in display order, each with its listed entries (featured first). */
function grouped(d: Dataset): { title: string; entries: Entry[] }[] {
  const out: { title: string; entries: Entry[] }[] = [];
  for (const s of d.taxonomy.sections) {
    const refs = s.subsections?.length
      ? s.subsections.map((sub) => ({ ref: `${s.id}/${sub.id}`, title: `${s.title}: ${sub.title}` }))
      : [{ ref: s.id, title: s.title }];
    for (const { ref, title } of refs) {
      const entries = entriesFor(d, ref, s.ordered);
      if (entries.length) out.push({ title, entries });
    }
  }
  return out;
}

const HEADER = [
  "# Awesome Inference Engineering",
  "",
  "> A curated, continuously verified map of inference engineering: tools, techniques, hardware, and knowledge for serving AI models fast, cheaply, and reliably.",
  "",
  `Entries are curated by humans and re-verified weekly. Machine-readable data: ${SITE_URL}/api/entries.json (CC0-1.0).`,
  "",
];

function llmsTxt(d: Dataset): string {
  const out = [...HEADER];
  for (const g of grouped(d)) {
    const picks = g.entries.filter((e) => e.featured || g.title === "Start Here");
    if (!picks.length) continue;
    out.push(`## ${g.title}`, "", ...picks.map(line), "");
  }
  out.push("## Optional", "", `- [Full list](${SITE_URL}/llms-full.txt): Every listed entry with its description.`, "");
  return out.join("\n");
}

function llmsFullTxt(d: Dataset): string {
  const out = [...HEADER];
  for (const g of grouped(d)) out.push(`## ${g.title}`, "", ...g.entries.map(line), "");
  return out.join("\n");
}

mkdirSync(join(outDir, "api"), { recursive: true });
const json = entriesJson(ds);
writeFileSync(join(outDir, "api", "entries.json"), JSON.stringify(json, null, 2) + "\n");
writeFileSync(join(outDir, "llms.txt"), llmsTxt(ds));
writeFileSync(join(outDir, "llms-full.txt"), llmsFullTxt(ds));
const listed = ds.entries.filter((e) => isListed(e, ds.metadata)).length;
console.log(`Wrote exports to ${outDir} (${json.entries.length} entries, ${listed} listed).`);
