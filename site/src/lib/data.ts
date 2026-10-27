// Build-time access to the list data. Reads site/public/api/entries.json, which
// `node scripts/build-exports.ts --out site/public` generates (pnpm site:build does it for you).

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { slugify } from "./format.ts";
import { roman } from "./roman.ts";
import { facetIdsFor, topSectionOf } from "./filter.ts";
import { baseUrl } from "./base.ts";
import { entryContext } from "./entry-html.ts";
import type { CatalogEntry, CatalogPayload, GlossaryTerm, SectionInfo, TagGroups } from "./types.ts";

interface RawEntry {
  id: string;
  name: string;
  url: string;
  description: string;
  section: string;
  type: string;
  tags?: string[];
  license?: string;
  featured?: boolean;
  pricing?: CatalogEntry["pricing"];
  status?: CatalogEntry["status"];
  successor?: string;
  maturity?: CatalogEntry["maturity"];
  paper?: CatalogEntry["paper"];
  verified?: string;
  added: string;
  github?: { stars?: number; pushedAt?: string | null; createdAt?: string | null };
}

interface RawExport {
  name: string;
  homepage: string;
  license: string;
  generatedAt: string | null;
  sections: SectionInfo[];
  tags: TagGroups;
  glossary: GlossaryTerm[];
  entries: RawEntry[];
}

/** Sections whose entries form a sequence (the reading path). The export does not carry `ordered`. */
const ORDERED_SECTIONS = new Set(["start-here"]);

const exportPath = join(__SITE_ROOT__, "public", "api", "entries.json");
if (!existsSync(exportPath)) {
  throw new Error(
    `Missing ${exportPath}. Generate it with "node scripts/build-exports.ts --out site/public" (or run "pnpm site:build").`,
  );
}
const raw = JSON.parse(readFileSync(exportPath, "utf8")) as RawExport;

function curatedOrder(entries: RawEntry[], sections: SectionInfo[]): Map<string, number> {
  const refs: string[] = [];
  for (const s of sections) {
    if (s.subsections.length) for (const sub of s.subsections) refs.push(sub.id);
    else refs.push(s.id);
  }
  const rank = new Map(refs.map((r, i) => [r, i]));
  const sorted = entries
    .map((e, i) => ({ e, i }))
    .sort((a, b) => {
      const ra = rank.get(a.e.section) ?? refs.length;
      const rb = rank.get(b.e.section) ?? refs.length;
      if (ra !== rb) return ra - rb;
      const ordered = ORDERED_SECTIONS.has(topSectionOf(a.e.section));
      if (!ordered && Boolean(a.e.featured) !== Boolean(b.e.featured)) return a.e.featured ? -1 : 1;
      return a.i - b.i;
    });
  return new Map(sorted.map(({ e }, n) => [e.id, n]));
}

const order = curatedOrder(raw.entries, raw.sections);

const entries: CatalogEntry[] = raw.entries.map((e) => ({
  id: e.id,
  name: e.name,
  url: e.url,
  description: e.description,
  section: e.section,
  type: e.type,
  tags: e.tags ?? [],
  ...(e.license ? { license: e.license } : {}),
  ...(e.featured ? { featured: true } : {}),
  ...(e.pricing ? { pricing: e.pricing } : {}),
  status: e.status ?? "active",
  ...(e.successor ? { successor: e.successor } : {}),
  ...(e.maturity ? { maturity: e.maturity } : {}),
  ...(e.paper ? { paper: e.paper } : {}),
  added: e.added,
  ...(e.verified ? { verified: e.verified } : {}),
  ...(typeof e.github?.stars === "number" ? { stars: e.github.stars } : {}),
  ...(e.github?.pushedAt ? { pushed: e.github.pushedAt } : {}),
  ...(e.github?.createdAt ? { created: e.github.createdAt } : {}),
  order: order.get(e.id) ?? 0,
}));
entries.sort((a, b) => a.order - b.order);


export const isListed = (e: CatalogEntry): boolean => e.status !== "archived" && e.status !== "deprecated";
export const isOrdered = (sectionId: string): boolean => ORDERED_SECTIONS.has(sectionId);

const sectionById = new Map(raw.sections.map((s) => [s.id, s]));
const subTitle = new Map(raw.sections.flatMap((s) => s.subsections.map((sub) => [sub.id, sub.title] as const)));

// Tag ids must be unique across groups for /tags/<tag>/ to be unambiguous.
const tagGroupOf = new Map<string, string>();
for (const [group, g] of Object.entries(raw.tags)) {
  for (const tag of Object.keys(g.tags)) {
    if (tagGroupOf.has(tag)) throw new Error(`Tag "${tag}" appears in two groups (${tagGroupOf.get(tag)}, ${group}).`);
    tagGroupOf.set(tag, group);
  }
}

const listedCounts: Record<string, number> = {};
const totalCounts: Record<string, number> = {};
for (const e of entries) {
  const top = topSectionOf(e.section);
  totalCounts[top] = (totalCounts[top] ?? 0) + 1;
  if (isListed(e)) listedCounts[top] = (listedCounts[top] ?? 0) + 1;
}

export const site = {
  name: raw.name,
  homepage: raw.homepage,
  contentLicense: raw.license,
  generatedAt: raw.generatedAt,
  sections: raw.sections,
  tags: raw.tags,
  glossary: raw.glossary,
  entries,
  facetIds: facetIdsFor(raw.tags),
  /** Entries shown by default (not archived or deprecated). */
  listedCount: entries.filter(isListed).length,
  listedBySection: listedCounts,
  totalBySection: totalCounts,
} as const;

/**
 * Newest additions first: by `added` date, then by when the project itself appeared (repository creation
 * date), so a bulk import still surfaces new work. Shared by "Recently added" and /whats-new/.
 */
export function newestFirst(a: CatalogEntry, b: CatalogEntry): number {
  return b.added.localeCompare(a.added) || (b.created ?? "").localeCompare(a.created ?? "") || a.order - b.order;
}

export function getSection(id: string): SectionInfo | undefined {
  return sectionById.get(id);
}

export function sectionTitle(id: string): string {
  return sectionById.get(id)?.title ?? id;
}

/** Title of a "<section>/<subsection>" reference's subsection, if it has one. */
export function subsectionTitle(ref: string): string | undefined {
  return subTitle.get(ref);
}

export function entriesInSection(sectionId: string): CatalogEntry[] {
  return entries.filter((e) => topSectionOf(e.section) === sectionId);
}

export function entriesWithTag(tag: string): CatalogEntry[] {
  return entries.filter((e) => e.tags.includes(tag));
}

export function tagLabel(tag: string): string {
  const group = tagGroupOf.get(tag);
  return (group && raw.tags[group]?.tags[tag]) || tag;
}

export function tagGroup(tag: string): string | undefined {
  return tagGroupOf.get(tag);
}

export function entryById(id: string): CatalogEntry | undefined {
  return entries.find((e) => e.id === id);
}

/** Anchor id for a glossary term. */
export function glossaryId(term: string): string {
  return slugify(term);
}

/** The payload served to the catalog at /catalog-index.json. */
export function catalogPayload(): CatalogPayload {
  return {
    generatedAt: raw.generatedAt,
    sections: raw.sections,
    tags: raw.tags,
      entries,
  };
}

/** Section number in taxonomy order, starting at 1. */
const sectionOrdinal = new Map(raw.sections.map((s, i) => [s.id, i + 1] as const));

/** "II" for the second section. */
export function sectionNumeral(id: string): string {
  const n = sectionOrdinal.get(id);
  return n ? roman(n) : "";
}

/** "II.3" for the third subsection of the second section; "II" for a section without subsections. */
export function subsectionNumeral(ref: string): string {
  const [top, sub] = ref.split("/");
  const section = top ? sectionById.get(top) : undefined;
  if (!top || !section) return "";
  if (!sub) return sectionNumeral(top);
  const i = section.subsections.findIndex((s) => s.id === ref);
  return i < 0 ? sectionNumeral(top) : `${sectionNumeral(top)}.${i + 1}`;
}


/** "2026.10": the year and month of the last data refresh. */
export const edition: string = (raw.generatedAt ?? new Date().toISOString()).slice(0, 7).replace("-", ".");

/** Context for rendering entry blocks at build time (lib/entry-html.ts). */
export const entryCtx = entryContext(raw.sections, entries, baseUrl());
