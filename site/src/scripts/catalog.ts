// The catalog's filtering. The page is rendered with every entry in curated order; this script loads the
// compact payload, then hides, shows and reorders those same nodes. All filtering logic is in lib/filter.ts.

import {
  buildIndex,
  clearFilters,
  facetCounts,
  facetIdsFor,
  filterEntries,
  isDefaultState,
  parseState,
  stateToSearch,
  toggleFacet,
  type FilterState,
} from "../lib/filter.ts";
import { baseUrl } from "../lib/base.ts";
import { entryContext, entryHtml } from "../lib/entry-html.ts";
import type { CatalogPayload, SortKey } from "../lib/types.ts";

const root = document.querySelector<HTMLElement>("[data-catalog]");
if (root) void start(root);

async function start(root: HTMLElement): Promise<void> {
  const html = document.documentElement;
  let payload: CatalogPayload;
  try {
    const res = await fetch(root.dataset.src ?? "", { credentials: "same-origin" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    payload = (await res.json()) as CatalogPayload;
  } catch {
    // Without the payload the page still lists every entry; it just cannot filter.
    html.classList.remove("cat-pending");
    return;
  }

  const ids = facetIdsFor(payload.tags);
  const titles = Object.fromEntries(payload.sections.map((s) => [s.id, s.title]));
  const index = buildIndex(payload.entries, payload.tags, titles);

  const list = root.querySelector<HTMLOListElement>("[data-results]");
  const query = root.querySelector<HTMLInputElement>("[data-query]");
  const count = root.querySelector<HTMLElement>("[data-count]");
  const status = root.querySelector<HTMLElement>("[data-status]");
  const empty = root.querySelector<HTMLElement>("[data-empty]");
  const archived = root.querySelector<HTMLInputElement>("[data-archived]");
  const active = root.querySelector<HTMLElement>("[data-active]");
  const filters = root.querySelector<HTMLDetailsElement>("[data-filters]");
  const clears = [...root.querySelectorAll<HTMLButtonElement>("[data-clear]")];
  const sorts = [...root.querySelectorAll<HTMLInputElement>('input[name="sort"]')];
  if (!list || !query || !count) return;

  const nodes = new Map<string, HTMLElement>();
  for (const li of list.querySelectorAll<HTMLElement>(":scope > li[data-id]")) nodes.set(li.dataset.id ?? "", li);

  // Render the entries that are not in the HTML yet, with the build's own renderer. They stay detached
  // until render() places the ones that match.
  const ctx = entryContext(payload.sections, payload.entries, baseUrl());
  const missing = payload.entries.filter((e) => !nodes.has(e.id));
  if (missing.length) {
    const tpl = document.createElement("template");
    tpl.innerHTML = missing.map((e) => entryHtml(e, ctx, { showSection: true, hidden: true })).join("");
    // A DocumentFragment is not an element, so ":scope > li" would match nothing here; walk its children.
    for (const li of [...tpl.content.children] as HTMLElement[]) if (li.dataset.id) nodes.set(li.dataset.id, li);
  }

  // Facet checkboxes, with their count element, keyed by facet and value.
  const boxes = [...root.querySelectorAll<HTMLInputElement>(".facet input[type=checkbox]")].map((input) => ({
    input,
    facet: input.name,
    value: input.value,
    count: input.closest("label")?.querySelector<HTMLElement>(".count") ?? null,
  }));
  const facetGroups = [...root.querySelectorAll<HTMLDetailsElement>("[data-facet]")];

  let state: FilterState = parseState(location.search, ids);
  let lastOrder = "";
  let announce = 0;

  function render(): void {
    const results = filterEntries(index, state, ids);

    // Results: show matches in order, hide the rest. Skip the DOM work when nothing moved.
    const order = results.map((r) => r.entry.id).join("\n");
    if (order !== lastOrder && list) {
      lastOrder = order;
      const shown = new Set<string>();
      const frag = document.createDocumentFragment();
      for (const r of results) {
        const li = nodes.get(r.entry.id);
        if (!li) continue;
        shown.add(r.entry.id);
        li.hidden = false;
        frag.append(li);
      }
      for (const [id, li] of nodes) if (!shown.has(id)) li.hidden = true;
      list.append(frag);
    }

    // Counts and control state.
    const counts = facetCounts(index, state, ids);
    for (const b of boxes) {
      const n = counts[b.facet]?.[b.value] ?? 0;
      const on = state.facets[b.facet]?.includes(b.value) ?? false;
      b.input.checked = on;
      b.input.disabled = !on && n === 0;
      if (b.count) b.count.textContent = String(n);
    }
    let selected = 0;
    for (const group of facetGroups) {
      const n = state.facets[group.dataset.facet ?? ""]?.length ?? 0;
      selected += n;
      const on = group.querySelector<HTMLElement>("[data-on]");
      if (on) on.textContent = n ? `· ${n}` : "";
      if (n) group.open = true;
    }
    if (active) active.textContent = selected ? `· ${selected}` : "";
    for (const s of sorts) s.checked = s.value === state.sort;
    if (archived) archived.checked = state.archived;
    if (document.activeElement !== query && query) query.value = state.q;
    // "Clear" resets the filters and keeps the sort order, so it only shows while something is filtered.
    const unfiltered = isDefaultState({ ...state, sort: "curated" });
    for (const c of clears) c.hidden = unfiltered && c.closest("[data-empty]") === null;
    if (empty) empty.hidden = results.length > 0;

    // The visible count updates at once; screen readers hear it once typing pauses.
    const text = `${results.length} ${results.length === 1 ? "entry" : "entries"}`;
    if (count) count.textContent = text;
    window.clearTimeout(announce);
    announce = window.setTimeout(() => {
      if (status) status.textContent = text;
    }, 600);

    const search = stateToSearch(state, ids);
    if (search !== location.search) history.replaceState(history.state, "", `${location.pathname}${search}${location.hash}`);
    html.classList.remove("cat-pending");
  }

  function update(next: FilterState): void {
    state = next;
    render();
  }

  query.addEventListener("input", () => update({ ...state, q: query.value }));
  query.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && query.value) {
      event.preventDefault();
      update({ ...state, q: "" });
      query.value = "";
    }
  });
  root.querySelector("[data-query-form]")?.addEventListener("submit", (event) => event.preventDefault());

  for (const b of boxes) b.input.addEventListener("change", () => update(toggleFacet(state, b.facet, b.value, b.input.checked)));
  for (const s of sorts) s.addEventListener("change", () => s.checked && update({ ...state, sort: s.value as SortKey }));
  archived?.addEventListener("change", () => update({ ...state, archived: archived.checked }));
  for (const c of clears)
    c.addEventListener("click", () => {
      update(clearFilters(state));
      query.value = "";
      query.focus();
    });

  // Below 900px the rail is a <details>, folded before first paint by an inline script in the page.
  // At desktop width its summary is hidden, so it must stay open when the window widens.
  const wide = window.matchMedia("(min-width: 900px)");
  wide.addEventListener("change", () => {
    if (filters && wide.matches) filters.open = true;
  });

  window.addEventListener("popstate", () => update(parseState(location.search, ids)));

  render();
}
