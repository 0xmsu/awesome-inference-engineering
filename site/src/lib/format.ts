// Small formatting helpers shared by build-time rendering and the browser script.

const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escape text for HTML content and double- or single-quoted attributes. */
export function esc(value: string | number | undefined | null): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c);
}

/** 1234 -> "1.2k", 95683 -> "96k". */
export function formatStars(stars: number): string {
  if (stars < 1000) return String(stars);
  const k = stars / 1000;
  return `${k < 10 ? k.toFixed(1).replace(/\.0$/, "") : Math.round(k)}k`;
}

/** "2026-10-27T13:21:22Z" -> "2026-10". */
export function yearMonth(date: string | undefined): string | undefined {
  return date && /^\d{4}-\d{2}/.test(date) ? date.slice(0, 7) : undefined;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-10" -> "October 2026". */
export function monthLabel(ym: string): string {
  const [y, m] = ym.split("-");
  const name = MONTHS[Number(m) - 1];
  return name && y ? `${name} ${y}` : ym;
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

/** Slug for glossary anchors: lowercase, alphanumerics and hyphens. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const EMOJI_WORDS: [RegExp, string][] = [
  [/💲/gu, "commercial"],
  [/⚠️?/gu, "maintenance"],
  [/⭐️?/gu, "editor’s pick"],
  [/🧪/gu, "experimental"],
];

/**
 * Text from the data and from CONTRIBUTING.md also feeds the README, which uses emoji as markers.
 * The site spells them out as words. Keeps surrounding whitespace, so it is safe on text between inline nodes.
 */
export function emojiToWords(text: string): string {
  let out = text;
  for (const [re, word] of EMOJI_WORDS) out = out.replace(re, () => `“${word}”`);
  return out.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "");
}

/** emojiToWords, with runs of whitespace collapsed and the ends trimmed: for whole strings. */
export function plainText(text: string): string {
  return emojiToWords(text).replace(/\s{2,}/g, " ").trim();
}
