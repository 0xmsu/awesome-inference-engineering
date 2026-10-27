import { describe, expect, it } from "vitest";
import GithubSlugger from "github-slugger";
import { loadDataset } from "../scripts/lib/data.ts";
import { Slugger, formatStars, renderReadme } from "../scripts/lib/readme.ts";

describe("Slugger", () => {
  it("matches GitHub heading anchors", () => {
    const s = new Slugger();
    expect(s.slug("Local & Desktop Runtimes")).toBe("local--desktop-runtimes");
    expect(s.slug("Hybrid CPU–GPU & Offloading")).toBe("hybrid-cpugpu--offloading");
    expect(s.slug("NVIDIA")).toBe("nvidia");
    expect(s.slug("NVIDIA")).toBe("nvidia-1");
  });
  it("agrees with github-slugger on every taxonomy title", () => {
    const ours = new Slugger();
    const reference = new GithubSlugger();
    const titles = loadDataset().taxonomy.sections.flatMap((sec) => [sec.title, ...(sec.subsections ?? []).map((sub) => sub.title)]);
    for (const t of titles) expect(ours.slug(t)).toBe(reference.slug(t));
  });
});

describe("formatStars", () => {
  it.each([
    [999, "999"],
    [1000, "1k"],
    [4289, "4.3k"],
    [95683, "96k"],
  ])("%d -> %s", (n, s) => expect(formatStars(n)).toBe(s));
});

describe("renderReadme", () => {
  const ds = loadDataset();
  const readme = renderReadme(ds);
  it("is deterministic", () => {
    expect(renderReadme(ds)).toBe(readme);
  });
  it("omits archived entries and lists each URL once", () => {
    expect(readme).not.toContain("text-generation-inference");
    const listing = readme.slice(0, readme.indexOf("## Contributing"));
    const urls = [...listing.matchAll(/\*\*\[[^\]]+\]\((https:[^)]+)\)\*\*/g)].map((m) => m[1]);
    expect(new Set(urls).size).toBe(urls.length);
  });
  it("links every table-of-contents item to a heading", () => {
    const anchors = [...readme.matchAll(/^ *- \[[^\]]+\]\(#([^)]+)\)/gm)].map((m) => m[1]);
    const s = new Slugger();
    const headings = [...readme.matchAll(/^#{1,3} (.+)$/gm)].map((m) => s.slug(m[1] ?? ""));
    for (const a of anchors) expect(headings).toContain(a);
  });
});
