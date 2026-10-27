import { describe, expect, it } from "vitest";
import { entryContext, entryHtml, licenseText } from "../site/src/lib/entry-html.ts";
import type { CatalogEntry, SectionInfo } from "../site/src/lib/types.ts";

const sections: SectionInfo[] = [
  { id: "start-here", title: "Start Here", description: "", subsections: [] },
  {
    id: "engines",
    title: "Inference Engines",
    description: "",
    subsections: [
      { id: "engines/datacenter", title: "Datacenter Engines" },
      { id: "engines/local", title: "Local & Desktop Runtimes" },
    ],
  },
];

const base: CatalogEntry = {
  id: "llama-cpp",
  name: "llama.cpp",
  url: "https://github.com/ggml-org/llama.cpp",
  description: "Dependency-free C/C++ inference <with> GGUF.",
  section: "engines/local",
  type: "tool",
  tags: [],
  status: "active",
  added: "2026-10-27",
  order: 0,
};
const successor: CatalogEntry = { ...base, id: "next", name: "Next Engine", url: "https://example.com/next", order: 1 };
const ctx = entryContext(sections, [base, successor], "/awesome-inference-engineering/");

describe("entryHtml", () => {
  it("renders name, type and an escaped description, with no metadata line when there is none", () => {
    const html = entryHtml(base, ctx);
    expect(html).toContain('<a class="e-name" href="https://github.com/ggml-org/llama.cpp" rel="noopener">llama.cpp</a>');
    expect(html).toContain('<span class="e-type">Tool</span>');
    expect(html).toContain("&lt;with&gt;");
    expect(html).not.toContain("e-meta");
    expect(html).not.toContain("pick");
  });

  it("links the subsection under the site base and numbers it in the title", () => {
    const html = entryHtml(base, ctx, { showSection: true });
    expect(html).toContain('href="/awesome-inference-engineering/sections/engines/#local"');
    expect(html).toContain('title="II.2 in Inference Engines"');
    expect(html).toContain("Local &amp; Desktop Runtimes");
  });

  it("puts warnings first, then license, stars and the last update", () => {
    const html = entryHtml(
      { ...base, featured: true, status: "maintenance", successor: "next", maturity: "experimental", license: "MIT", stars: 95692, pushed: "2026-10-20T10:00:00Z" },
      ctx,
    );
    const meta = html.slice(html.indexOf("e-meta"));
    const order = ["maintenance", "Superseded by Next Engine", "experimental", "MIT", "96k stars", "Updated 2026-10"].map((s) => meta.indexOf(s));
    expect(order.every((i) => i > 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(html).toContain('aria-label="Editor’s pick"');
    expect(html).toContain('title="95,692 GitHub stars"');
  });

  it("supports hidden entries and reading-order numbers", () => {
    expect(entryHtml(base, ctx, { hidden: true })).toMatch(/^<li class="entry" id="e-llama-cpp" data-id="llama-cpp" hidden>/);
    expect(entryHtml(base, ctx, { num: 3 })).toContain('<span class="e-num" aria-hidden="true">3</span>');
  });
});

describe("licenseText", () => {
  it("shortens compound SPDX expressions", () => {
    expect(licenseText("Apache-2.0 WITH LLVM-exception AND LicenseRef-MAX")).toBe("Apache-2.0 + custom");
    expect(licenseText("MIT AND LicenseRef-Proprietary")).toBe("MIT + proprietary");
    expect(licenseText("Apache-2.0")).toBe("Apache-2.0");
  });
});
