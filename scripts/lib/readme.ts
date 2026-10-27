// Renders README.md from the dataset. Pure and deterministic: same data, same output.

import {
  isListed,
  repoMeta,
  effectiveStatus,
  topSection,
  type Dataset,
  type Entry,
  type Metadata,
  type Section,
} from "./data.ts";

export const SITE_URL = "https://0xmsu.github.io/awesome-inference-engineering";
export const REPO_URL = "https://github.com/0xmsu/awesome-inference-engineering";

/** Subsections with more entries than this are partly folded into <details>. */
export const FOLD_THRESHOLD = 20;
export const VISIBLE_WHEN_FOLDED = 15;

const TITLE = "Awesome Inference Engineering";
const TAGLINE =
  "A curated, continuously verified map of inference engineering: the tools, techniques, hardware, and knowledge " +
  "for serving AI models fast, cheaply, and reliably, from GPU kernels to global fleets.";

/** GitHub-compatible heading anchors (mirrors github-slugger), with duplicate suffixes. */
export class Slugger {
  private seen = new Map<string, number>();
  slug(text: string): string {
    const base = text
      .toLowerCase()
      .replace(/[ -⁯⸀-⹿\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "")
      .replace(/ /g, "-");
    const n = this.seen.get(base) ?? 0;
    this.seen.set(base, n + 1);
    return n === 0 ? base : `${base}-${n}`;
  }
}

export function formatStars(stars: number): string {
  if (stars < 1000) return String(stars);
  const k = stars / 1000;
  return `${k < 10 ? k.toFixed(1).replace(/\.0$/, "") : Math.round(k)}k`;
}

const TYPE_MARK: Partial<Record<Entry["type"], string>> = { paper: "📄", book: "📖", course: "🎓" };

export function markers(entry: Entry, metadata: Metadata): string {
  const m: string[] = [];
  if (entry.featured) m.push("⭐");
  const typeMark = TYPE_MARK[entry.type];
  if (typeMark) m.push(typeMark);
  if (entry.pricing === "commercial") m.push("💲");
  if (effectiveStatus(entry, metadata) === "maintenance") m.push("⚠️");
  if (entry.maturity === "experimental") m.push("🧪");
  return m.join(" ");
}

/** The small metadata line after a description: license, stars, activity, venue. */
export function metaLine(entry: Entry, metadata: Metadata): string {
  const parts: string[] = [];
  if (entry.paper) {
    parts.push([entry.paper.venue, entry.paper.year].filter(Boolean).join(" "));
    if (entry.paper.code) parts.push(`[code](${entry.paper.code})`);
  }
  const meta = repoMeta(entry, metadata);
  const license = entry.license ?? (meta?.license && meta.license !== "NOASSERTION" ? meta.license : undefined);
  if (license) parts.push(license);
  if (meta) {
    parts.push(`★ ${formatStars(meta.stars)}`);
    if (meta.pushedAt) parts.push(`updated ${meta.pushedAt.slice(0, 7)}`);
  }
  return parts.length ? ` <sub>${parts.join(" · ")}</sub>` : "";
}

export function renderEntry(entry: Entry, metadata: Metadata, bullet = "-"): string {
  const mark = markers(entry, metadata);
  return `${bullet} **[${entry.name}](${entry.url})**${mark ? ` ${mark}` : ""} — ${entry.description}${metaLine(entry, metadata)}`;
}

/** Entries of one section reference, in display order (editor's picks first unless the section is ordered). */
export function entriesFor(ds: Dataset, ref: string, ordered = false): Entry[] {
  const list = ds.entries.filter((e) => e.section === ref && isListed(e, ds.metadata));
  if (ordered) return list;
  return [...list.filter((e) => e.featured), ...list.filter((e) => !e.featured)];
}

function renderList(entries: Entry[], metadata: Metadata, ordered: boolean): string[] {
  const lines = entries.map((e, i) => renderEntry(e, metadata, ordered ? `${i + 1}.` : "-"));
  if (ordered || lines.length <= FOLD_THRESHOLD) return lines;
  const hidden = lines.slice(VISIBLE_WHEN_FOLDED);
  return [
    ...lines.slice(0, VISIBLE_WHEN_FOLDED),
    "",
    "<details>",
    `<summary>Show ${hidden.length} more</summary>`,
    "",
    ...hidden,
    "",
    "</details>",
  ];
}

interface RenderedSection {
  section: Section;
  count: number;
  subsections: { title: string; description?: string; entries: Entry[] }[];
  entries: Entry[];
}

function collect(ds: Dataset): RenderedSection[] {
  const out: RenderedSection[] = [];
  for (const section of ds.taxonomy.sections) {
    if (section.subsections?.length) {
      const subsections = section.subsections
        .map((sub) => ({ title: sub.title, description: sub.description, entries: entriesFor(ds, `${section.id}/${sub.id}`) }))
        .filter((s) => s.entries.length > 0);
      const count = subsections.reduce((n, s) => n + s.entries.length, 0);
      if (count) out.push({ section, count, subsections, entries: [] });
    } else {
      const entries = entriesFor(ds, section.id, section.ordered);
      if (entries.length) out.push({ section, count: entries.length, subsections: [], entries });
    }
  }
  return out;
}

function badge(label: string, message: string, color: string): string {
  const esc = (s: string) => encodeURIComponent(s.replace(/-/g, "--").replace(/_/g, "__"));
  return `https://img.shields.io/badge/${esc(label)}-${esc(message)}-${color}`;
}

export function renderReadme(ds: Dataset): string {
  const slugger = new Slugger();
  slugger.slug(TITLE);
  const sections = collect(ds);
  const body = sections.filter((s) => s.section.placement !== "footer");
  const footer = sections.filter((s) => s.section.placement === "footer");
  const listedCount = sections.reduce((n, s) => n + s.count, 0);

  // Assign anchors in document order so duplicate titles get the same suffixes GitHub gives them.
  slugger.slug("Contents");
  const anchors = new Map<string, string>();
  for (const s of [...body, ...footer]) {
    anchors.set(s.section.id, slugger.slug(s.section.title));
    for (const sub of s.subsections) anchors.set(`${s.section.id}/${sub.title}`, slugger.slug(sub.title));
  }

  const out: string[] = [];
  out.push("<!-- Generated from data/ by scripts/build-readme.ts. Edit the YAML files in data/, not this file. -->");
  out.push("");
  out.push(`# ${TITLE}`);
  out.push("");
  out.push(TAGLINE);
  out.push("");
  const badges = [`[![Entries](${badge("entries", String(listedCount), "0a7e5c")})](#contents)`];
  if (ds.metadata.generatedAt)
    badges.push(
      `[![Last verified](${badge("verified", ds.metadata.generatedAt.slice(0, 10), "0a7e5c")})](data/generated/metadata.json)`,
    );
  badges.push(`[![Content license: CC0-1.0](${badge("content", "CC0-1.0", "lightgrey")})](LICENSE)`);
  out.push(badges.join(" "));
  out.push("");
  out.push(
    `**[Website](${SITE_URL}/)** · **[Catalog](${SITE_URL}/catalog/)** · **[Contributing](CONTRIBUTING.md)** · **[JSON](${SITE_URL}/api/entries.json)**`,
  );
  out.push("");
  out.push(
    "**Legend:** ⭐ editor's pick · 💲 commercial · ⚠️ maintenance mode · 🧪 experimental · 📄 paper · 📖 book · 🎓 course",
  );
  out.push("");

  out.push("## Contents");
  out.push("");
  for (const s of [...body, ...footer]) {
    out.push(`- [${s.section.title}](#${anchors.get(s.section.id)}) <sub>${s.count}</sub>`);
    for (const sub of s.subsections) out.push(`  - [${sub.title}](#${anchors.get(`${s.section.id}/${sub.title}`)})`);
  }
  out.push("");

  for (const s of [...body, ...footer]) {
    out.push(`## ${s.section.title}`);
    out.push("");
    out.push(s.section.description.trim());
    out.push("");
    if (s.subsections.length) {
      for (const sub of s.subsections) {
        out.push(`### ${sub.title}`);
        out.push("");
        if (sub.description) {
          out.push(sub.description);
          out.push("");
        }
        out.push(...renderList(sub.entries, ds.metadata, false));
        out.push("");
      }
    } else {
      out.push(...renderList(s.entries, ds.metadata, Boolean(s.section.ordered)));
      out.push("");
    }
  }

  out.push("## Contributing");
  out.push("");
  out.push(
    "Suggestions are welcome. This README is generated: add or edit entries in the YAML files under `data/` and " +
      "run `pnpm build`. See [CONTRIBUTING.md](CONTRIBUTING.md) for the inclusion criteria and style guide.",
  );
  out.push("");
  out.push("## License");
  out.push("");
  out.push(
    "List content (everything in `data/` and this README) is dedicated to the public domain under " +
      "[CC0 1.0](LICENSE). Scripts and site code are [MIT](LICENSE-CODE) licensed.",
  );
  out.push("");
  return out.join("\n");
}

/** Number of README-listed entries per top-level section (used by exports and the site). */
export function listedCounts(ds: Dataset): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const e of ds.entries) if (isListed(e, ds.metadata)) counts[topSection(e.section)] = (counts[topSection(e.section)] ?? 0) + 1;
  return counts;
}
