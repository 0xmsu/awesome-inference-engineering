// Renders CONTRIBUTING.md (the single source for the inclusion criteria and style guide) to HTML at build time.
// Relative links in the file point at repository paths, so they are rewritten to GitHub URLs.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { hastToHtml, markdownToHast } from "satteri";
import { emojiToWords, slugify } from "./format.ts";

const REPO = "https://github.com/0xmsu/awesome-inference-engineering";

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

/** Repository-relative href -> absolute GitHub URL. Absolute URLs and fragments are left alone. */
export function repoHref(href: string): string {
  if (/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(href)) return href;
  // "../../issues/new/choose" is written relative to the file's GitHub page.
  if (/^(\.\.\/)+(issues|pulls|discussions|actions)(\/|$)/.test(href)) return `${REPO}/${href.replace(/^(\.\.\/)+/, "")}`;
  const path = href.replace(/^\.\//, "").replace(/^\//, "");
  const [file, hash] = path.split("#");
  const kind = file?.endsWith("/") ? "tree" : "blob";
  return `${REPO}/${kind}/main/${file}${hash ? `#${hash}` : ""}`;
}

function textOf(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

export interface PolicyDoc {
  html: string;
  headings: { depth: number; slug: string; text: string }[];
}

export function renderPolicy(siteRoot: string): PolicyDoc {
  const source = readFileSync(join(siteRoot, "..", "CONTRIBUTING.md"), "utf8");
  const tree = markdownToHast(source) as unknown as HastNode;
  const headings: PolicyDoc["headings"] = [];
  const seen = new Set<string>();
  let lastHeading = "Table";

  const visit = (node: HastNode, parent?: HastNode): void => {
    if (node.type === "text" && node.value && parent?.tagName !== "code") node.value = emojiToWords(node.value);
    if (node.type === "element" && node.tagName === "a" && typeof node.properties?.href === "string") {
      const href = repoHref(node.properties.href);
      node.properties.href = href;
      if (!href.startsWith("#") && href.startsWith("http")) node.properties.rel = "noopener";
    }
    if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
      const text = textOf(node);
      let slug = slugify(text) || "section";
      for (let n = 2; seen.has(slug); n++) slug = `${slugify(text)}-${n}`;
      seen.add(slug);
      node.properties = { ...node.properties, id: slug };
      headings.push({ depth: node.tagName === "h2" ? 2 : 3, slug, text });
      lastHeading = text;
    }
    if (node.type === "element" && node.tagName === "table" && parent?.children) {
      // Keep wide tables from forcing a horizontal page scroll on phones.
      const wrapper: HastNode = { type: "element", tagName: "div", properties: { className: ["table-wrap"], tabIndex: 0, role: "region", "aria-label": lastHeading }, children: [node] };
      parent.children[parent.children.indexOf(node)] = wrapper;
    }
    for (const child of [...(node.children ?? [])]) visit(child, node);
  };

  // The page title is rendered by the layout, so drop the file's own H1.
  tree.children = (tree.children ?? []).filter((n) => !(n.type === "element" && n.tagName === "h1"));
  visit(tree);
  return { html: hastToHtml(tree as never), headings };
}

export const POLICY_SOURCE = `${REPO}/blob/main/CONTRIBUTING.md`;
