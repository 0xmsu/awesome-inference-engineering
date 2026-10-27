import { describe, expect, it } from "vitest";
import { normalizeUrl, repoOf } from "../scripts/lib/data.ts";

describe("normalizeUrl", () => {
  it("ignores case on GitHub paths, www, trailing slashes, and fragments", () => {
    expect(normalizeUrl("https://www.GitHub.com/vLLM-Project/vLLM/#readme")).toBe("github.com/vllm-project/vllm");
  });
  it("keeps path case elsewhere", () => {
    expect(normalizeUrl("https://example.com/Docs/Page/")).toBe("example.com/Docs/Page");
  });
});

describe("repoOf", () => {
  it("derives owner/name from repository-root URLs only", () => {
    expect(repoOf({ url: "https://github.com/ggml-org/llama.cpp" })).toBe("ggml-org/llama.cpp");
    expect(repoOf({ url: "https://github.com/ggml-org/llama.cpp/tree/master/tools" })).toBeUndefined();
    expect(repoOf({ url: "https://lmstudio.ai", repo: "lmstudio-ai/lms" })).toBe("lmstudio-ai/lms");
  });
});
