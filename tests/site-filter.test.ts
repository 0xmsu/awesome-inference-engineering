import { describe, expect, it } from "vitest";
import {
  buildIndex,
  clearFilters,
  emptyState,
  facetCounts,
  facetIdsFor,
  filterEntries,
  isDefaultState,
  licenseTokens,
  parseState,
  stateToSearch,
  toggleFacet,
  NO_LICENSE,
  relevance,
  queryTerms,
  type FilterState,
} from "../site/src/lib/filter.ts";
import type { CatalogEntry, TagGroups } from "../site/src/lib/types.ts";

const tags: TagGroups = {
  vertical: { label: "Vertical", tags: { llm: "LLM", speech: "Speech & audio" } },
  hardware: { label: "Hardware", tags: { nvidia: "NVIDIA GPU", apple: "Apple silicon" } },
  deployment: { label: "Deployment", tags: { local: "Local & desktop", kubernetes: "Kubernetes" } },
};
const ids = facetIdsFor(tags);
const titles = { engines: "Inference Engines", kernels: "Kernels & GPU Programming", learning: "Learning Resources" };

let order = 0;
function entry(over: Partial<CatalogEntry> & { id: string }): CatalogEntry {
  return {
    name: over.id,
    url: `https://example.com/${over.id}`,
    description: `Description of ${over.id}.`,
    section: "engines/datacenter",
    type: "tool",
    tags: [],
    status: "active",
    added: "2026-01-01",
    order: order++,
    ...over,
  };
}

const entries: CatalogEntry[] = [
  entry({ id: "vllm", name: "vLLM", tags: ["llm", "nvidia", "python"], license: "Apache-2.0", stars: 90000, pushed: "2026-10-20T10:00:00Z", pricing: "oss", added: "2026-03-01" }),
  entry({ id: "sglang", name: "SGLang", tags: ["llm", "nvidia"], license: "Apache-2.0", stars: 30000, pushed: "2026-10-25T10:00:00Z", pricing: "oss", added: "2026-05-01" }),
  entry({ id: "llama-cpp", name: "llama.cpp", section: "engines/local", tags: ["llm", "apple", "local"], license: "MIT", stars: 80000, pushed: "2026-10-01T10:00:00Z", maturity: "stable", added: "2026-02-01" }),
  entry({ id: "triton", name: "Triton", section: "kernels/languages", tags: ["nvidia"], license: "MIT AND LicenseRef-Proprietary", stars: 15000, pushed: "2026-09-01T10:00:00Z", maturity: "experimental", added: "2026-06-01" }),
  entry({ id: "paper-a", name: "A paper", section: "learning/papers", type: "paper", tags: [], added: "2026-07-01", verified: "2026-08-15" }),
  entry({ id: "oldtool", name: "Old tool", tags: ["llm"], status: "archived", stars: 500, license: "MIT", added: "2025-01-01" }),
  entry({ id: "legacy", name: "Legacy", tags: ["speech"], status: "deprecated", added: "2025-02-01" }),
  entry({ id: "cloud", name: "Cloud API", section: "engines/datacenter", type: "service", tags: ["llm"], pricing: "commercial", license: "proprietary", status: "maintenance", added: "2026-04-01" }),
];
const index = buildIndex(entries, tags, titles);
const run = (state: Partial<FilterState> = {}) => filterEntries(index, { ...emptyState(), ...state }, ids).map((i) => i.entry.id);

describe("licenseTokens", () => {
  it("handles missing, simple, compound and custom licenses", () => {
    expect(licenseTokens(undefined)).toEqual([NO_LICENSE]);
    expect(licenseTokens("  ")).toEqual([NO_LICENSE]);
    expect(licenseTokens("Apache-2.0")).toEqual(["Apache-2.0"]);
    expect(licenseTokens("Apache-2.0 WITH LLVM-exception")).toEqual(["Apache-2.0"]);
    expect(licenseTokens("Apache-2.0 AND BSD-3-Clause")).toEqual(["Apache-2.0", "BSD-3-Clause"]);
    expect(licenseTokens("MIT AND LicenseRef-Proprietary")).toEqual(["MIT", "proprietary"]);
    expect(licenseTokens("Apache-2.0 WITH LLVM-exception AND LicenseRef-MAX")).toEqual(["Apache-2.0", "other"]);
    expect(licenseTokens("proprietary")).toEqual(["proprietary"]);
  });
});

describe("filtering", () => {
  it("hides archived and deprecated entries by default", () => {
    expect(run()).not.toContain("oldtool");
    expect(run()).not.toContain("legacy");
    expect(run()).toHaveLength(6);
  });

  it("shows them with the archived toggle", () => {
    expect(run({ archived: true })).toHaveLength(8);
  });

  it("an explicit status facet overrides the default hiding", () => {
    expect(run({ facets: { status: ["archived"] } })).toEqual(["oldtool"]);
    expect(run({ facets: { status: ["archived", "deprecated"] } }).sort()).toEqual(["legacy", "oldtool"]);
  });

  it("ORs values inside a facet and ANDs across facets", () => {
    expect(run({ facets: { type: ["paper", "service"] } }).sort()).toEqual(["cloud", "paper-a"]);
    expect(run({ facets: { vertical: ["llm"], hardware: ["apple"] } })).toEqual(["llama-cpp"]);
    expect(run({ facets: { vertical: ["llm"], hardware: ["nvidia", "apple"] } }).sort()).toEqual(["llama-cpp", "sglang", "vllm"]);
  });

  it("filters by top-level section", () => {
    expect(run({ facets: { section: ["kernels"] } })).toEqual(["triton"]);
    expect(run({ facets: { section: ["learning", "kernels"] } }).sort()).toEqual(["paper-a", "triton"]);
  });

  it("filters by compound license tokens", () => {
    expect(run({ facets: { license: ["MIT"] } }).sort()).toEqual(["llama-cpp", "triton"]);
    expect(run({ facets: { license: ["proprietary"] } }).sort()).toEqual(["cloud", "triton"]);
    expect(run({ facets: { license: [NO_LICENSE] } })).toEqual(["paper-a"]);
  });

  it("filters by pricing and maturity, which only some entries have", () => {
    expect(run({ facets: { pricing: ["commercial"] } })).toEqual(["cloud"]);
    expect(run({ facets: { maturity: ["experimental"] } })).toEqual(["triton"]);
  });

  it("matches free text across name, description, tags and section title, with every term required", () => {
    expect(run({ q: "vllm" })).toEqual(["vllm"]);
    expect(run({ q: "LLAMA.cpp" })).toEqual(["llama-cpp"]);
    expect(run({ q: "kernels gpu" })).toEqual(["triton"]); // section title
    expect(run({ q: "apple silicon" })).toEqual(["llama-cpp"]); // tag label
    expect(run({ q: "description of vllm" })).toEqual(["vllm"]);
    expect(run({ q: "vllm nope" })).toEqual([]);
    expect(run({ q: "   " })).toHaveLength(6);
  });

  it("combines text with facets", () => {
    expect(run({ q: "description", facets: { type: ["tool"], hardware: ["nvidia"] } }).sort()).toEqual(["sglang", "triton", "vllm"]);
  });
});

describe("relevance", () => {
  const ranked = buildIndex(
    [
      entry({ id: "a", name: "Speculative decoding survey", description: "Covers vLLM and others.", tags: [] }),
      entry({ id: "b", name: "vLLM", description: "An engine." }),
      entry({ id: "c", name: "Production vLLM guide", description: "Notes." }),
      entry({ id: "d", name: "Engine notes", description: "Mentions vllm in passing.", tags: [] }),
      entry({ id: "e", name: "vllm-ascend", description: "Plugin." }),
    ],
    tags,
    titles,
  );
  const order = (q: string, sort: FilterState["sort"] = "curated") =>
    filterEntries(ranked, { ...emptyState(), q, sort }, ids).map((i) => i.entry.id);

  it("scores an exact name above a prefix, a word start, and a mention in the description", () => {
    const score = (id: string) => relevance(ranked.find((i) => i.entry.id === id)!, queryTerms("vllm"));
    expect(score("b")).toBeGreaterThan(score("e"));
    expect(score("e")).toBeGreaterThan(score("c"));
    expect(score("c")).toBeGreaterThan(score("a"));
    expect(score("a")).toBe(score("d"));
  });

  it("puts the best match first under the default order, then curated order", () => {
    expect(order("vllm")).toEqual(["b", "e", "c", "a", "d"]);
  });

  it("leaves an explicit sort alone", () => {
    expect(order("vllm", "stars")).toEqual(["a", "b", "c", "d", "e"]);
  });
});

describe("sorting", () => {
  it("curated order follows the order field", () => {
    expect(run()).toEqual(["vllm", "sglang", "llama-cpp", "triton", "paper-a", "cloud"]);
  });

  it("sorts by stars, with unknown stars last and ties in curated order", () => {
    expect(run({ sort: "stars" })).toEqual(["vllm", "llama-cpp", "sglang", "triton", "paper-a", "cloud"]);
  });

  it("sorts by last update: pushed date, then verified date, unknown last", () => {
    expect(run({ sort: "updated" })).toEqual(["sglang", "vllm", "llama-cpp", "triton", "paper-a", "cloud"]);
  });

  it("sorts by recently added", () => {
    expect(run({ sort: "added" })).toEqual(["paper-a", "triton", "sglang", "cloud", "vllm", "llama-cpp"]);
  });

  it("does not mutate the index", () => {
    const before = index.map((i) => i.entry.id);
    run({ sort: "stars" });
    expect(index.map((i) => i.entry.id)).toEqual(before);
  });
});

describe("facet counts", () => {
  it("counts the visible entries by default", () => {
    const c = facetCounts(index, emptyState(), ids);
    expect(c.type).toEqual({ tool: 4, paper: 1, service: 1 });
    expect(c.vertical).toEqual({ llm: 4 });
    expect(c.hardware).toEqual({ nvidia: 3, apple: 1 });
    expect(c.section).toEqual({ engines: 4, kernels: 1, learning: 1 });
  });

  it("counts statuses including archived ones, whatever the archived toggle says", () => {
    const c = facetCounts(index, emptyState(), ids);
    expect(c.status).toEqual({ active: 5, maintenance: 1, archived: 1, deprecated: 1 });
  });

  it("ignores a facet's own selection when counting that facet, but applies the others", () => {
    const state: FilterState = { ...emptyState(), facets: { type: ["paper"], hardware: ["nvidia"] } };
    const c = facetCounts(index, state, ids);
    // type counts: hardware=nvidia applies, type does not
    expect(c.type).toEqual({ tool: 3 });
    // hardware counts: type=paper applies, hardware does not -> no paper has hardware tags
    expect(c.hardware).toEqual({});
    // vertical counts: both apply -> nothing matches both
    expect(c.vertical).toEqual({});
  });

  it("applies the text query to every facet", () => {
    const c = facetCounts(index, { ...emptyState(), q: "vllm" }, ids);
    expect(c.type).toEqual({ tool: 1 });
    expect(c.hardware).toEqual({ nvidia: 1 });
  });

  it("counts of a facet agree with the result when one of its values is selected", () => {
    const state: FilterState = { ...emptyState(), facets: { hardware: ["nvidia"] } };
    const c = facetCounts(index, state, ids);
    expect(c.hardware?.["nvidia"]).toBe(run({ facets: { hardware: ["nvidia"] } }).length);
    expect(c.hardware?.["apple"]).toBe(run({ facets: { hardware: ["apple"] } }).length);
  });
});

describe("URL state", () => {
  it("parses and serializes a full state", () => {
    const state = parseState("?q=vllm+fast&type=tool,library&hardware=nvidia&sort=stars&archived=1", ids);
    expect(state).toEqual({
      q: "vllm fast",
      sort: "stars",
      archived: true,
      facets: { type: ["tool", "library"], hardware: ["nvidia"] },
    });
    expect(stateToSearch(state, ids)).toBe("?q=vllm+fast&hardware=nvidia&type=library,tool&sort=stars&archived=1");
  });

  it("round-trips: parse(serialize(state)) is state", () => {
    const states: FilterState[] = [
      emptyState(),
      { ...emptyState(), q: "kv cache" },
      { ...emptyState(), sort: "added", facets: { section: ["kernels", "engines"], license: ["Apache-2.0"] } },
      { ...emptyState(), archived: true, facets: { status: ["archived"], vertical: ["llm"] } },
      { ...emptyState(), q: 'weird & "chars" =+?', facets: { type: ["tool"] } },
    ];
    for (const s of states) {
      const back = parseState(stateToSearch(s, ids), ids);
      expect(back.q).toBe(s.q);
      expect(back.sort).toBe(s.sort);
      expect(back.archived).toBe(s.archived);
      for (const id of ids) expect([...(back.facets[id] ?? [])].sort()).toEqual([...(s.facets[id] ?? [])].sort());
    }
  });

  it("omits defaults and ignores unknown params and invalid values", () => {
    expect(stateToSearch(emptyState(), ids)).toBe("");
    const s = parseState("?sort=bogus&nonsense=1&type=&archived=0&q=%20%20", ids);
    expect(isDefaultState(s)).toBe(true);
  });

  it("de-duplicates repeated values", () => {
    expect(parseState("?type=tool,tool,paper", ids).facets["type"]).toEqual(["tool", "paper"]);
  });

  it("accepts URLSearchParams too", () => {
    expect(parseState(new URLSearchParams({ q: "x", sort: "added" }), ids)).toMatchObject({ q: "x", sort: "added" });
  });
});

describe("state helpers", () => {
  it("toggleFacet adds and removes values without mutating", () => {
    const s0 = emptyState();
    const s1 = toggleFacet(s0, "type", "tool");
    expect(s0.facets).toEqual({});
    expect(s1.facets["type"]).toEqual(["tool"]);
    expect(toggleFacet(s1, "type", "tool").facets["type"]).toEqual([]);
    expect(toggleFacet(s1, "type", "tool", true)).toBe(s1);
  });

  it("clearFilters keeps only the sort order", () => {
    const s: FilterState = { q: "x", sort: "stars", archived: true, facets: { type: ["tool"] } };
    expect(clearFilters(s)).toEqual({ q: "", sort: "stars", archived: false, facets: {} });
  });
});

describe("scale", () => {
  it("filters and counts 2000 entries quickly", () => {
    const many: CatalogEntry[] = Array.from({ length: 2000 }, (_, i) =>
      entry({ id: `e${i}`, tags: i % 2 ? ["llm", "nvidia"] : ["speech"], stars: i, license: i % 3 ? "MIT" : undefined }),
    );
    const big = buildIndex(many, tags, titles);
    const t0 = performance.now();
    for (let i = 0; i < 20; i++) {
      const state: FilterState = { ...emptyState(), q: "e1", facets: { vertical: ["llm"] } };
      filterEntries(big, state, ids);
      facetCounts(big, state, ids);
    }
    expect(performance.now() - t0).toBeLessThan(2000);
  });
});
