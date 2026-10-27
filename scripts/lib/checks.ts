// Content rules for the dataset, beyond what JSON Schema can express.

import { validateSchema } from "./schema.ts";
import { expectedFile, normalizeUrl, sectionRefs, type Dataset, type LoadedEntry } from "./data.ts";

export interface CheckResult {
  errors: string[];
  warnings: string[];
}

export const MAX_FEATURED_PER_SECTION = 3;

const MARKETING =
  /\b(the best|the fastest|the easiest|blazing(ly)?|revolutionary|world-class|cutting-edge|game-chang\w*|lightning-fast|awesome|amazing|incredible|ultimate|unparalleled|unmatched)\b/i;
const EMOJI = /\p{Extended_Pictographic}/u;

/** Style rules for a single description. Returns problems as messages. */
export function descriptionProblems(entry: Pick<LoadedEntry, "name" | "description">): string[] {
  const d = entry.description;
  const problems: string[] = [];
  if (!d.endsWith(".")) problems.push("description must end with a period");
  if (!/^[A-Z0-9"“'(]/.test(d)) problems.push("description must start with an uppercase letter or digit");
  if (d.toLowerCase().startsWith(entry.name.toLowerCase())) problems.push("description must not start with the entry name");
  if (/\s{2,}/.test(d) || d !== d.trim()) problems.push("description has extra whitespace");
  if (MARKETING.test(d)) problems.push(`description uses marketing language ("${MARKETING.exec(d)?.[0]}")`);
  if (EMOJI.test(d)) problems.push("description must not contain emoji");
  if (/\bTODO\b/.test(d)) problems.push("description is still a TODO placeholder");
  return problems;
}

export function checkDataset(ds: Dataset, today = new Date().toISOString().slice(0, 10)): CheckResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Schemas.
  for (const [name, data] of [
    ["taxonomy", ds.taxonomy],
    ["tags", ds.tags],
    ["sources", ds.sources],
    ["glossary", ds.glossary],
  ] as const) {
    for (const e of validateSchema(name, data)) errors.push(`data/${name}.yml: ${e}`);
  }
  for (const [file, data] of Object.entries(ds.entryFiles)) {
    for (const e of validateSchema("entry", data)) errors.push(`data/entries/${file}: ${e}`);
  }
  if (errors.length) return { errors, warnings }; // later checks assume well-formed data

  // 2. Taxonomy integrity.
  const seenSections = new Set<string>();
  for (const s of ds.taxonomy.sections) {
    if (seenSections.has(s.id)) errors.push(`data/taxonomy.yml: duplicate section id "${s.id}"`);
    seenSections.add(s.id);
    const subs = new Set<string>();
    for (const sub of s.subsections ?? []) {
      if (subs.has(sub.id)) errors.push(`data/taxonomy.yml: duplicate subsection id "${s.id}/${sub.id}"`);
      subs.add(sub.id);
    }
  }

  // 3. Entries.
  const refs = sectionRefs(ds.taxonomy);
  const knownTags = new Set(Object.values(ds.tags).flatMap((g) => Object.keys(g.tags)));
  const knownSources = new Set(ds.sources.map((s) => s.id));
  const ids = new Map<string, LoadedEntry>();
  const urls = new Map<string, LoadedEntry>();
  const featured = new Map<string, number>();

  for (const entry of ds.entries) {
    const at = `data/entries/${entry.file} [${entry.id}]`;
    const prevId = ids.get(entry.id);
    if (prevId) errors.push(`${at}: duplicate id (also in ${prevId.file})`);
    ids.set(entry.id, entry);

    const norm = normalizeUrl(entry.url);
    const prevUrl = urls.get(norm);
    if (prevUrl) errors.push(`${at}: duplicate URL (same as "${prevUrl.id}")`);
    urls.set(norm, entry);

    if (!refs.has(entry.section)) errors.push(`${at}: unknown section "${entry.section}"`);
    else if (expectedFile(entry) !== entry.file) errors.push(`${at}: belongs in data/entries/${expectedFile(entry)}`);

    for (const tag of entry.tags ?? []) if (!knownTags.has(tag)) errors.push(`${at}: unknown tag "${tag}"`);
    for (const via of entry.via ?? []) if (!knownSources.has(via)) errors.push(`${at}: unknown source "${via}"`);
    for (const p of descriptionProblems(entry)) errors.push(`${at}: ${p}`);

    if (entry.type === "paper" && !entry.paper) errors.push(`${at}: papers need a "paper" block with at least the year`);
    if (entry.added > today) warnings.push(`${at}: "added" date ${entry.added} is in the future`);
    if (entry.featured) featured.set(entry.section, (featured.get(entry.section) ?? 0) + 1);
  }

  for (const entry of ds.entries) {
    if (entry.successor && !ids.has(entry.successor))
      errors.push(`data/entries/${entry.file} [${entry.id}]: unknown successor "${entry.successor}"`);
    if (entry.successor === entry.id) errors.push(`data/entries/${entry.file} [${entry.id}]: successor is itself`);
  }
  for (const [section, n] of featured)
    if (n > MAX_FEATURED_PER_SECTION)
      errors.push(`section ${section}: ${n} featured entries (max ${MAX_FEATURED_PER_SECTION})`);

  for (const term of ds.glossary)
    for (const id of term.see ?? [])
      if (!ids.has(id)) errors.push(`data/glossary.yml [${term.term}]: unknown entry "${id}" in see`);

  return { errors, warnings };
}
