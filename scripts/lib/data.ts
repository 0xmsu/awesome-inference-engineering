// Loading and shared helpers for the list data in data/.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

export type EntryType =
  | "tool"
  | "library"
  | "service"
  | "paper"
  | "book"
  | "course"
  | "article"
  | "docs"
  | "spec"
  | "video"
  | "podcast"
  | "benchmark"
  | "dataset"
  | "hardware"
  | "community"
  | "event"
  | "list";

export type Status = "active" | "maintenance" | "archived" | "deprecated";

export interface Entry {
  id: string;
  name: string;
  url: string;
  description: string;
  section: string;
  type: EntryType;
  tags?: string[];
  repo?: string;
  license?: string;
  featured?: boolean;
  pricing?: "oss" | "freemium" | "commercial";
  status?: Status;
  successor?: string;
  maturity?: "experimental" | "stable";
  paper?: { venue?: string; year: number; code?: string };
  via?: string[];
  verified?: string;
  added: string;
  notes?: string;
}

export interface Subsection {
  id: string;
  title: string;
  description?: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  ordered?: boolean;
  placement?: "body" | "footer";
  subsections?: Subsection[];
}

export interface Taxonomy {
  sections: Section[];
}

export type TagGroups = Record<string, { label: string; tags: Record<string, string> }>;

export interface Source {
  id: string;
  name: string;
  repo: string;
  license: string;
  description: string;
  watch?: boolean;
}

export interface GlossaryTerm {
  term: string;
  aka?: string[];
  definition: string;
  see?: string[];
}

export interface RepoMeta {
  nameWithOwner: string;
  stars: number;
  pushedAt: string | null;
  createdAt: string | null;
  archived: boolean;
  isFork: boolean;
  license: string | null;
  latestRelease: { tag: string; publishedAt: string } | null;
  description: string | null;
}

export interface Metadata {
  generatedAt: string | null;
  repos: Record<string, RepoMeta | { missing: true }>;
}

/** An entry together with the file it was loaded from. */
export interface LoadedEntry extends Entry {
  file: string;
}

export interface Dataset {
  taxonomy: Taxonomy;
  tags: TagGroups;
  sources: Source[];
  glossary: GlossaryTerm[];
  entries: LoadedEntry[];
  /** Raw parsed content of each entry file, keyed by file name, for schema validation. */
  entryFiles: Record<string, unknown>;
  metadata: Metadata;
}

export function readYaml(path: string): unknown {
  return parse(readFileSync(path, "utf8"));
}

export function loadDataset(root = ROOT): Dataset {
  const dataDir = join(root, "data");
  const entriesDir = join(dataDir, "entries");
  const entryFiles: Record<string, unknown> = {};
  const entries: LoadedEntry[] = [];
  for (const file of readdirSync(entriesDir).filter((f) => f.endsWith(".yml")).sort()) {
    const parsed = readYaml(join(entriesDir, file)) ?? [];
    entryFiles[file] = parsed;
    if (Array.isArray(parsed)) {
      for (const item of parsed) entries.push({ ...(item as Entry), file });
    }
  }
  const metadataPath = join(dataDir, "generated", "metadata.json");
  const metadata: Metadata = existsSync(metadataPath)
    ? (JSON.parse(readFileSync(metadataPath, "utf8")) as Metadata)
    : { generatedAt: null, repos: {} };
  return {
    taxonomy: readYaml(join(dataDir, "taxonomy.yml")) as Taxonomy,
    tags: readYaml(join(dataDir, "tags.yml")) as TagGroups,
    sources: (readYaml(join(dataDir, "sources.yml")) ?? []) as Source[],
    glossary: (readYaml(join(dataDir, "glossary.yml")) ?? []) as GlossaryTerm[],
    entries,
    entryFiles,
    metadata,
  };
}

/** The top-level section id an entry belongs to, e.g. "engines" for "engines/datacenter". */
export function topSection(section: string): string {
  return section.split("/")[0] ?? section;
}

/** Entry files are named after their top-level section. */
export function expectedFile(entry: Entry): string {
  return `${topSection(entry.section)}.yml`;
}

/** All valid section references ("h2" for leaf sections, "h2/h3" otherwise). */
export function sectionRefs(taxonomy: Taxonomy): Set<string> {
  const refs = new Set<string>();
  for (const s of taxonomy.sections) {
    if (s.subsections?.length) for (const sub of s.subsections) refs.add(`${s.id}/${sub.id}`);
    else refs.add(s.id);
  }
  return refs;
}

const GITHUB_REPO_ROOT = /^https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\/?$/;

/** GitHub "owner/name" for an entry: explicit `repo`, or derived from a repository-root URL. */
export function repoOf(entry: Pick<Entry, "url" | "repo">): string | undefined {
  if (entry.repo) return entry.repo;
  const m = GITHUB_REPO_ROOT.exec(entry.url);
  return m ? `${m[1]}/${m[2]}` : undefined;
}

/** Key used in metadata.json: lowercase owner/name. */
export function repoKey(repo: string): string {
  return repo.toLowerCase();
}

export function repoMeta(entry: Entry, metadata: Metadata): RepoMeta | undefined {
  const repo = repoOf(entry);
  if (!repo) return undefined;
  const meta = metadata.repos[repoKey(repo)];
  return meta && !("missing" in meta) ? meta : undefined;
}

/** Status from the data, falling back to GitHub's archived flag. */
export function effectiveStatus(entry: Entry, metadata: Metadata): Status {
  if (entry.status) return entry.status;
  return repoMeta(entry, metadata)?.archived ? "archived" : "active";
}

/** Whether an entry is shown in the README (archived and deprecated entries live on the site only). */
export function isListed(entry: Entry, metadata: Metadata): boolean {
  const status = effectiveStatus(entry, metadata);
  return status !== "archived" && status !== "deprecated";
}

/** Normalized form of a URL for duplicate detection. */
export function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    let host = u.hostname.toLowerCase().replace(/^www\./, "");
    let path = u.pathname.replace(/\/+$/, "");
    if (host === "github.com") path = path.toLowerCase();
    return `${host}${path}${u.search}`;
  } catch {
    return url.trim().toLowerCase();
  }
}
