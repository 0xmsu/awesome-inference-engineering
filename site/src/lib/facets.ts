// Facet definitions for the catalog's filter panel, rendered on the server and updated by the browser script.

import { PRICING_LABEL, STATUS_LABEL, typeLabel } from "./labels.ts";
import { NO_LICENSE, buildIndex, facetCounts, facetIdsFor, emptyState, type FacetCounts } from "./filter.ts";
import type { CatalogPayload } from "./types.ts";

export interface FacetValue {
  value: string;
  label: string;
  /** Count under the default filter state. */
  count: number;
}

export interface FacetDef {
  id: string;
  label: string;
  /** Whether the group starts expanded. */
  open: boolean;
  values: FacetValue[];
}

const LICENSE_LAST: Record<string, number> = { proprietary: 1, other: 2, [NO_LICENSE]: 3 };

function licenseLabel(v: string): string {
  if (v === NO_LICENSE) return "Not stated";
  if (v === "proprietary") return "Proprietary";
  if (v === "other") return "Other";
  return v;
}

/** Counts per facet value over the whole dataset, ignoring any filter (including archived hiding). */
function totals(payload: CatalogPayload): FacetCounts {
  const ids = facetIdsFor(payload.tags);
  const index = buildIndex(payload.entries, payload.tags);
  return facetCounts(index, { ...emptyState(), archived: true }, ids);
}

export function facetDefs(payload: CatalogPayload): FacetDef[] {
  const ids = facetIdsFor(payload.tags);
  const all = totals(payload);
  const initial = facetCounts(buildIndex(payload.entries, payload.tags), emptyState(), ids);
  const defs: FacetDef[] = [];

  for (const id of ids) {
    const total = all[id] ?? {};
    const now = initial[id] ?? {};
    let values: { value: string; label: string }[] = [];
    let label = id;
    let open = false;

    if (id === "section") {
      label = "Section";
      open = true;
      values = payload.sections.map((s) => ({ value: s.id, label: s.title }));
    } else if (payload.tags[id]) {
      const group = payload.tags[id];
      label = group?.label ?? id;
      values = Object.entries(group?.tags ?? {}).map(([value, l]) => ({ value, label: l }));
      open = false;
    } else if (id === "type") {
      label = "Type";
      open = false;
      values = Object.keys(total)
        .sort((a, b) => (total[b] ?? 0) - (total[a] ?? 0) || a.localeCompare(b))
        .map((value) => ({ value, label: typeLabel(value) }));
    } else if (id === "pricing") {
      label = "Pricing";
      values = ["oss", "freemium", "commercial"].map((value) => ({ value, label: PRICING_LABEL[value] ?? value }));
    } else if (id === "status") {
      label = "Status";
      values = ["active", "maintenance", "archived", "deprecated"].map((value) => ({ value, label: STATUS_LABEL[value] ?? value }));
    } else if (id === "maturity") {
      label = "Maturity";
      values = ["stable", "experimental"].map((value) => ({ value, label: value === "stable" ? "Stable" : "Experimental" }));
    } else if (id === "license") {
      label = "License";
      values = Object.keys(total)
        .sort((a, b) => (LICENSE_LAST[a] ?? 0) - (LICENSE_LAST[b] ?? 0) || (total[b] ?? 0) - (total[a] ?? 0) || a.localeCompare(b))
        .map((value) => ({ value, label: licenseLabel(value) }));
    }

    const present = values.filter((v) => (total[v.value] ?? 0) > 0);
    if (!present.length) continue;
    defs.push({ id, label, open, values: present.map((v) => ({ ...v, count: now[v.value] ?? 0 })) });
  }
  return defs;
}

export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "curated", label: "Curated order" },
  { value: "stars", label: "Most stars" },
  { value: "updated", label: "Recently updated" },
  { value: "added", label: "Recently added" },
];
