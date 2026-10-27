// Markdown link extraction for upstream lists.

/** Markdown links with the heading they appear under. Skips in-page anchors, images, and badges. */
export function extractLinks(markdown: string): { heading: string; text: string; url: string }[] {
  const out: { heading: string; text: string; url: string }[] = [];
  let heading = "";
  for (const line of markdown.split("\n")) {
    const h = /^#{1,6}\s+(.*)$/.exec(line);
    if (h) {
      heading = (h[1] ?? "").trim();
      continue;
    }
    for (const m of line.matchAll(/(!?)\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)) {
      if (m[1] === "!") continue;
      const url = m[3] ?? "";
      if (/shields\.io|badge|awesome\.re/.test(url)) continue;
      out.push({ heading, text: (m[2] ?? "").trim(), url });
    }
  }
  return out;
}
