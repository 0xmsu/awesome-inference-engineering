import { describe, expect, it } from "vitest";
import { extractLinks } from "../scripts/lib/links.ts";

describe("extractLinks", () => {
  it("records the heading and skips images and badges", () => {
    const md = [
      "# Title",
      "[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)",
      "## Kernels",
      "- [FlashAttention](https://arxiv.org/abs/2205.14135) - Attention.",
      "![diagram](https://example.com/a.png)",
      "- [Anchor](#local) is ignored.",
    ].join("\n");
    expect(extractLinks(md)).toEqual([
      { heading: "Kernels", text: "FlashAttention", url: "https://arxiv.org/abs/2205.14135" },
    ]);
  });
});
