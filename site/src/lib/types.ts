// Shapes shared by the build-time pages and the browser script. Type-only: no runtime code.

export type EntryStatus = "active" | "maintenance" | "archived" | "deprecated";
export type SortKey = "curated" | "stars" | "updated" | "added";

/** One entry as the site uses it: the exported entry, flattened and trimmed. */
export interface CatalogEntry {
  id: string;
  name: string;
  url: string;
  description: string;
  /** "<section>/<subsection>", or "<section>" for sections without subsections. */
  section: string;
  type: string;
  tags: string[];
  license?: string;
  featured?: boolean;
  pricing?: "oss" | "freemium" | "commercial";
  status: EntryStatus;
  successor?: string;
  maturity?: "experimental" | "stable";
  paper?: { venue?: string; year: number; code?: string };
  /** YYYY-MM-DD */
  added: string;
  verified?: string;
  stars?: number;
  /** ISO timestamp of the last push to the entry's repository. */
  pushed?: string;
  /** ISO date the GitHub repository was created (when the project itself appeared). */
  created?: string;
  /** Position in the curated reading order across the whole list. */
  order: number;
}

export interface SubsectionInfo {
  /** Full reference, "<section>/<subsection>". */
  id: string;
  title: string;
}

export interface SectionInfo {
  id: string;
  title: string;
  description: string;
  subsections: SubsectionInfo[];
}

export interface TagGroup {
  label: string;
  tags: Record<string, string>;
}
export type TagGroups = Record<string, TagGroup>;

export interface GlossaryTerm {
  term: string;
  aka?: string[];
  definition: string;
  see?: string[];
}

/** The compact payload the catalog fetches at runtime. */
export interface CatalogPayload {
  generatedAt: string | null;
  sections: SectionInfo[];
  tags: TagGroups;
  entries: CatalogEntry[];
}
