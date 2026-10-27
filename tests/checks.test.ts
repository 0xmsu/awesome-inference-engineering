import { describe, expect, it } from "vitest";
import { checkDataset, descriptionProblems } from "../scripts/lib/checks.ts";
import { loadDataset, type Dataset, type LoadedEntry } from "../scripts/lib/data.ts";

const base = (over: Partial<LoadedEntry> = {}): LoadedEntry => ({
  id: "example",
  name: "Example",
  url: "https://github.com/example/example",
  description: "Serving engine used as a test fixture for the validator.",
  section: "engines/datacenter",
  type: "tool",
  added: "2026-10-27",
  file: "engines.yml",
  ...over,
});

function dataset(entries: LoadedEntry[]): Dataset {
  const real = loadDataset();
  const entryFiles: Record<string, unknown> = {};
  for (const e of entries) {
    const { file, ...rest } = e;
    ((entryFiles[file] ??= []) as unknown[]).push(rest);
  }
  return { ...real, entries, entryFiles };
}

describe("descriptionProblems", () => {
  it("accepts a well-formed description", () => {
    expect(descriptionProblems(base())).toEqual([]);
  });
  it.each([
    ["Serving engine without a final period", "end with a period"],
    ["serving engine starting lowercase.", "uppercase"],
    ["Example engine that names itself first.", "entry name"],
    ["The fastest engine in the world, for sure.", "marketing"],
    ["TODO: describe in your own words.", "TODO"],
    ["Serving engine with  a double space.", "whitespace"],
  ])("flags %j", (description, problem) => {
    expect(descriptionProblems(base({ description })).join(" ")).toContain(problem);
  });
});

describe("checkDataset", () => {
  it("passes on the real data", () => {
    expect(checkDataset(loadDataset()).errors).toEqual([]);
  });
  it("catches duplicate ids and URLs", () => {
    const { errors } = checkDataset(dataset([base(), base({ url: "https://github.com/Example/example/" })]));
    expect(errors.join("\n")).toMatch(/duplicate id/);
    expect(errors.join("\n")).toMatch(/duplicate URL/);
  });
  it("catches unknown sections, tags, sources, and wrong files", () => {
    const errors = checkDataset(
      dataset([
        base({ id: "aa", section: "engines/nope" }),
        base({ id: "bb", url: "https://b.example/", tags: ["nope"], via: ["nope"] }),
        base({ id: "cc", url: "https://c.example/", section: "kernels/libraries" }),
      ]),
    ).errors.join("\n");
    expect(errors).toMatch(/unknown section/);
    expect(errors).toMatch(/unknown tag/);
    expect(errors).toMatch(/unknown source/);
    expect(errors).toMatch(/belongs in data\/entries\/kernels\.yml/);
  });
  it("limits featured entries and requires paper metadata", () => {
    const featured = [1, 2, 3, 4].map((n) => base({ id: `f${n}`, url: `https://f${n}.example/`, featured: true }));
    const paper = base({ id: "pp", url: "https://p.example/", type: "paper" });
    const errors = checkDataset(dataset([...featured, paper])).errors.join("\n");
    expect(errors).toMatch(/4 featured entries/);
    expect(errors).toMatch(/papers need a "paper" block/);
  });
  it("rejects unknown successors", () => {
    const errors = checkDataset(dataset([base({ successor: "missing" })])).errors.join("\n");
    expect(errors).toMatch(/unknown successor/);
  });
});
