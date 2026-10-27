// Pure filtering, faceting, sorting and URL-state logic for the catalog.
// No DOM and no framework: the browser script and the unit tests both import this module.

import type { CatalogEntry, SortKey, TagGroups } from "./types.ts";

export const SORT_KEYS: readonly SortKey[] = ["curated", "stars", "updated", "added"];
export const DEFAULT_SORT: SortKey = "curated";

/** Facet ids that are not tag groups. Tag groups (vertical, hardware, ...) come from data/tags.yml. */
export const BASE_FACETS = ["section", "type", "pricing", "status", "maturity", "license"] as const;

/** Facet value used for entries whose license is not stated. */
export const NO_LICENSE = "unknown";

/** Statuses hidden until "show archived" is on (or a status facet is chosen). */
export const HIDDEN_BY_DEFAULT: readonly string[] = ["archived", "deprecated"];

export interface FilterState {
  /** Free-text query. */
  q: string;
  sort: SortKey;
  /** Include archived and deprecated entries. */
  archived: boolean;
  /** Selected values per facet id. Values within a facet are OR-ed, facets are AND-ed. */
  facets: Record<string, string[]>;
}

export interface Indexed {
  entry: CatalogEntry;
  /** Facet values of this entry, by facet id. */
  facets: Record<string, string[]>;
  /** Lower-cased searchable text. */
  hay: string;
  /** Lower-cased name, for ranking. */
  name: string;
  /** Lower-cased tags, type and section title: secondary evidence when ranking. */
  keys: string;
}

export type FacetCounts = Record<string, Record<string, number>>;

/** Facet ids in display order: section, tag groups, then the plain fields. */
export function facetIdsFor(tags: TagGroups): string[] {
  return ["section", ...Object.keys(tags), "type", "pricing", "status", "maturity", "license"];
}

export function emptyState(): FilterState {
  return { q: "", sort: DEFAULT_SORT, archived: false, facets: {} };
}

export function isDefaultState(state: FilterState): boolean {
  return (
    state.q.trim() === "" &&
    state.sort === DEFAULT_SORT &&
    !state.archived &&
    Object.values(state.facets).every((v) => v.length === 0)
  );
}

/** Top-level section id of a "<section>/<subsection>" reference. */
export function topSectionOf(ref: string): string {
  return ref.split("/")[0] ?? ref;
}

/**
 * SPDX-ish license strings become facet values: "Apache-2.0 WITH LLVM-exception" is Apache-2.0,
 * "MIT AND BSD-3-Clause" counts under both, LicenseRef-* becomes "proprietary" or "other".
 */
export function licenseTokens(license: string | undefined): string[] {
  if (!license || !license.trim()) return [NO_LICENSE];
  const out = new Set<string>();
  for (const part of license.split(/\s+(?:AND|OR)\s+/i)) {
    const id = part
      .replace(/\s+WITH\s+.+$/i, "")
      .replace(/[()]/g, "")
      .trim();
    if (!id) continue;
    if (/^LicenseRef-/i.test(id)) out.add(/proprietary/i.test(id) ? "proprietary" : "other");
    else if (id.toLowerCase() === "proprietary") out.add("proprietary");
    else out.add(id);
  }
  return out.size ? [...out] : [NO_LICENSE];
}

/** Values of one facet for one entry. */
export function facetValues(entry: CatalogEntry, facetId: string, tagGroups: TagGroups): string[] {
  switch (facetId) {
    case "section":
      return [topSectionOf(entry.section)];
    case "type":
      return [entry.type];
    case "pricing":
      return entry.pricing ? [entry.pricing] : [];
    case "status":
      return [entry.status];
    case "maturity":
      return entry.maturity ? [entry.maturity] : [];
    case "license":
      return licenseTokens(entry.license);
    default: {
      const group = tagGroups[facetId];
      return group ? entry.tags.filter((t) => t in group.tags) : [];
    }
  }
}

export function buildIndex(
  entries: readonly CatalogEntry[],
  tagGroups: TagGroups,
  sectionTitles: Readonly<Record<string, string>> = {},
): Indexed[] {
  const ids = facetIdsFor(tagGroups);
  const tagLabel = (t: string): string => {
    for (const g of Object.values(tagGroups)) if (t in g.tags) return g.tags[t] ?? t;
    return t;
  };
  return entries.map((entry) => {
    const facets: Record<string, string[]> = {};
    for (const id of ids) facets[id] = facetValues(entry, id, tagGroups);
    const keys = [entry.type, entry.tags.join(" "), entry.tags.map(tagLabel).join(" "), sectionTitles[topSectionOf(entry.section)] ?? ""]
      .join(" ")
      .toLowerCase();
    const hay = [entry.name, entry.id, entry.description, keys, entry.license ?? ""].join(" ").toLowerCase();
    return { entry, facets, hay, name: entry.name.toLowerCase(), keys };
  });
}

/** Whitespace-separated terms; every term must occur somewhere in the entry text. */
export function queryTerms(q: string): string[] {
  return q.toLowerCase().split(/\s+/).filter(Boolean);
}

export function matchesText(ix: Indexed, terms: readonly string[]): boolean {
  for (const t of terms) if (!ix.hay.includes(t)) return false;
  return true;
}

/** Slots an entry can fail: a facet id, or "*" for the text query. */
function failures(ix: Indexed, state: FilterState, terms: readonly string[], facetIds: readonly string[]): string[] {
  const failed: string[] = [];
  if (terms.length && !matchesText(ix, terms)) failed.push("*");
  for (const id of facetIds) {
    const wanted = state.facets[id];
    if (wanted && wanted.length) {
      const have = ix.facets[id] ?? [];
      if (!wanted.some((v) => have.includes(v))) failed.push(id);
    } else if (id === "status" && !state.archived && HIDDEN_BY_DEFAULT.includes(ix.entry.status)) {
      // Archived and deprecated entries are hidden unless asked for. Counted under the status facet.
      failed.push(id);
    }
  }
  return failed;
}

export function compareBy(sort: SortKey): (a: Indexed, b: Indexed) => number {
  const curated = (a: Indexed, b: Indexed) => a.entry.order - b.entry.order;
  const dateDesc = (a: string | undefined, b: string | undefined) => (b ?? "").slice(0, 10).localeCompare((a ?? "").slice(0, 10));
  switch (sort) {
    case "stars":
      return (a, b) => (b.entry.stars ?? -1) - (a.entry.stars ?? -1) || curated(a, b);
    case "updated":
      return (a, b) =>
        dateDesc(a.entry.pushed ?? a.entry.verified, b.entry.pushed ?? b.entry.verified) || curated(a, b);
    case "added":
      return (a, b) => dateDesc(a.entry.added, b.entry.added) || curated(a, b);
    default:
      return curated;
  }
}

/**
 * How well an entry answers the query terms: a name that is the term, starts with it, or has a word
 * starting with it, then tags, type and section, then anything in the description. 0 without a query.
 */
export function relevance(ix: Indexed, terms: readonly string[]): number {
  let score = 0;
  for (const t of terms) {
    if (ix.name === t) score += 100;
    else if (ix.name.startsWith(t)) score += 60;
    else if (ix.name.includes(` ${t}`) || ix.name.includes(`-${t}`) || ix.name.includes(`.${t}`)) score += 45;
    else if (ix.name.includes(t)) score += 30;
    else if (ix.keys.includes(t)) score += 8;
    else score += 1;
  }
  return score;
}

/**
 * Entries matching the state, sorted. Does not mutate the index. With a text query and the default
 * "curated" order, the best matches come first and curated order breaks ties.
 */
export function filterEntries(index: readonly Indexed[], state: FilterState, facetIds: readonly string[]): Indexed[] {
  const terms = queryTerms(state.q);
  const out = index.filter((ix) => failures(ix, state, terms, facetIds).length === 0);
  if (terms.length && state.sort === DEFAULT_SORT) {
    const score = new Map<Indexed, number>(out.map((ix) => [ix, relevance(ix, terms)]));
    return out.sort((a, b) => (score.get(b) ?? 0) - (score.get(a) ?? 0) || a.entry.order - b.entry.order);
  }
  return out.sort(compareBy(state.sort));
}

/**
 * Facet counts for the current state, in one pass. Each facet is counted as if its own selection
 * were absent (so choosing "tool" still shows how many "library" entries the other filters leave),
 * which is the usual disjunctive-facet behaviour.
 */
export function facetCounts(index: readonly Indexed[], state: FilterState, facetIds: readonly string[]): FacetCounts {
  const terms = queryTerms(state.q);
  const counts: FacetCounts = {};
  for (const id of facetIds) counts[id] = {};
  for (const ix of index) {
    const failed = failures(ix, state, terms, facetIds);
    if (failed.length > 1) continue;
    const only = failed[0];
    if (only === "*") continue;
    for (const id of facetIds) {
      if (only !== undefined && only !== id) continue;
      const bucket = counts[id];
      if (!bucket) continue;
      for (const v of ix.facets[id] ?? []) bucket[v] = (bucket[v] ?? 0) + 1;
    }
  }
  return counts;
}

// URL state ----------------------------------------------------------------------------------

/** Read filter state from a query string ("?q=...&type=tool,library"). Unknown keys and values are ignored. */
export function parseState(search: string | URLSearchParams, facetIds: readonly string[]): FilterState {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  const state = emptyState();
  state.q = (params.get("q") ?? "").trim().slice(0, 200);
  const sort = params.get("sort");
  if (sort && (SORT_KEYS as readonly string[]).includes(sort)) state.sort = sort as SortKey;
  const archived = params.get("archived");
  state.archived = archived === "1" || archived === "true";
  for (const id of facetIds) {
    const raw = params.get(id);
    if (!raw) continue;
    const values = [...new Set(raw.split(",").map((v) => v.trim()).filter(Boolean))];
    if (values.length) state.facets[id] = values;
  }
  return state;
}

/** Canonical query string for a state: "" for the default state, otherwise "?...". */
export function stateToSearch(state: FilterState, facetIds: readonly string[]): string {
  const params = new URLSearchParams();
  const q = state.q.trim();
  if (q) params.set("q", q);
  for (const id of facetIds) {
    const values = state.facets[id];
    if (values && values.length) params.set(id, [...values].sort().join(","));
  }
  if (state.sort !== DEFAULT_SORT) params.set("sort", state.sort);
  if (state.archived) params.set("archived", "1");
  // URLSearchParams encodes commas as %2C; keep them readable.
  const s = params.toString().replace(/%2C/gi, ",");
  return s ? `?${s}` : "";
}

/** Toggle one facet value, returning a new state. */
export function toggleFacet(state: FilterState, facetId: string, value: string, on?: boolean): FilterState {
  const current = state.facets[facetId] ?? [];
  const has = current.includes(value);
  const want = on ?? !has;
  if (want === has) return state;
  const next = want ? [...current, value] : current.filter((v) => v !== value);
  return { ...state, facets: { ...state.facets, [facetId]: next } };
}

/** Clear everything except the sort order. */
export function clearFilters(state: FilterState): FilterState {
  return { ...emptyState(), sort: state.sort };
}
