// The entry block as an HTML string: name and type; description; one line of metadata.
// Pure and framework-free, so the build (Entry.astro) and the catalog script render identical markup.

import { esc, formatStars, plainText, yearMonth } from "./format.ts";
import { licenseTokens, topSectionOf } from "./filter.ts";
import { typeLabel } from "./labels.ts";
import { roman } from "./roman.ts";
import type { CatalogEntry, SectionInfo } from "./types.ts";

export interface EntryContext {
  /** Site base path with one trailing slash, e.g. "/awesome-inference-engineering/". */
  base: string;
  sectionTitle(id: string): string;
  subsectionTitle(ref: string): string | undefined;
  /** "II.1" for a subsection reference, "II" for a section. */
  numeral(ref: string): string;
  entryById(id: string): CatalogEntry | undefined;
}

export interface EntryOptions {
  /** Show where the entry lives (catalog, tag pages, recently added). */
  showSection?: boolean;
  /** Reading-order number, set in the margin. */
  num?: number;
  hidden?: boolean;
}

export function entryContext(sections: readonly SectionInfo[], entries: readonly CatalogEntry[], base: string): EntryContext {
  const sectionTitles = new Map(sections.map((s) => [s.id, s.title]));
  const subsectionTitles = new Map(sections.flatMap((s) => s.subsections.map((sub) => [sub.id, sub.title] as const)));
  const numerals = new Map<string, string>();
  sections.forEach((s, i) => {
    numerals.set(s.id, roman(i + 1));
    s.subsections.forEach((sub, j) => numerals.set(sub.id, `${roman(i + 1)}.${j + 1}`));
  });
  const byId = new Map(entries.map((e) => [e.id, e]));
  return {
    base,
    sectionTitle: (id) => sectionTitles.get(id) ?? id,
    subsectionTitle: (ref) => subsectionTitles.get(ref),
    numeral: (ref) => numerals.get(ref) ?? numerals.get(topSectionOf(ref)) ?? "",
    entryById: (id) => byId.get(id),
  };
}

/** "Apache-2.0 WITH LLVM-exception AND LicenseRef-MAX" reads as "Apache-2.0 + custom"; the full SPDX string is the title. */
export function licenseText(license: string): string {
  const names: Record<string, string> = { proprietary: "proprietary", other: "custom" };
  return licenseTokens(license)
    .map((t) => names[t] ?? t)
    .join(" + ");
}

function attrs(cls?: string, title?: string): string {
  return `${cls ? ` class="${cls}"` : ""}${title ? ` title="${esc(title)}"` : ""}`;
}

const span = (text: string, cls?: string, title?: string): string => `<span${attrs(cls, title)}>${esc(text)}</span>`;

function link(text: string, href: string, cls?: string, title?: string): string {
  const rel = /^https?:/.test(href) ? ' rel="noopener"' : "";
  return `<a${attrs(cls, title)} href="${esc(href)}"${rel}>${esc(text)}</a>`;
}

/** The metadata line's items, in order: where, warnings, paper, license, stars, last update, code. */
export function metaParts(e: CatalogEntry, ctx: EntryContext, showSection = false): string[] {
  const parts: string[] = [];
  if (showSection) {
    const top = topSectionOf(e.section);
    const slug = e.section.split("/")[1];
    const where = slug ? (ctx.subsectionTitle(e.section) ?? ctx.sectionTitle(top)) : ctx.sectionTitle(top);
    parts.push(link(where, `${ctx.base}sections/${top}/${slug ? `#${slug}` : ""}`, "where", `${ctx.numeral(e.section)} in ${ctx.sectionTitle(top)}`));
  }
  if (e.status === "archived" || e.status === "deprecated" || e.status === "maintenance") parts.push(span(e.status, "flag"));
  if (e.successor) {
    const next = ctx.entryById(e.successor);
    if (next) parts.push(link(`Superseded by ${next.name}`, next.url, "flag"));
  }
  if (e.maturity === "experimental") parts.push(span("experimental", "flag"));
  if (e.pricing === "commercial" || e.pricing === "freemium") parts.push(span(e.pricing, "flag"));
  if (e.paper) parts.push(span([e.paper.venue, e.paper.year].filter(Boolean).join(" ")));
  if (e.license) parts.push(span(licenseText(e.license), undefined, e.license));
  if (typeof e.stars === "number") parts.push(span(`${formatStars(e.stars)} stars`, undefined, `${e.stars.toLocaleString("en-US")} GitHub stars`));
  const updated = yearMonth(e.pushed);
  if (updated) parts.push(span(`Updated ${updated}`));
  if (e.paper?.code) parts.push(link("Code", e.paper.code));
  return parts;
}

export function entryHtml(e: CatalogEntry, ctx: EntryContext, opts: EntryOptions = {}): string {
  const numbered = opts.num !== undefined;
  const parts = metaParts(e, ctx, opts.showSection);
  const pick = e.featured ? '<span class="pick" role="img" aria-label="Editor’s pick" title="Editor’s pick"></span>' : "";
  return (
    `<li class="entry${numbered ? " has-num" : ""}" id="e-${esc(e.id)}" data-id="${esc(e.id)}"${opts.hidden ? " hidden" : ""}>` +
    (numbered ? `<span class="e-num" aria-hidden="true">${opts.num}</span>` : "") +
    `<p class="e-head">${pick}<a class="e-name" href="${esc(e.url)}" rel="noopener">${esc(e.name)}</a> <span class="e-type">${esc(typeLabel(e.type))}</span></p>` +
    `<p class="e-desc">${esc(plainText(e.description))}</p>` +
    (parts.length ? `<p class="e-meta label">${parts.join('<span class="sep">&nbsp;· </span>')}</p>` : "") +
    "</li>"
  );
}
