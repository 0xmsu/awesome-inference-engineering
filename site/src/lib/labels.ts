// Display labels for entry fields. Plain words: the site never uses icons or emoji for these.

const TYPE_LABEL: Record<string, string> = {
  tool: "Tool",
  library: "Library",
  service: "Service",
  paper: "Paper",
  book: "Book",
  course: "Course",
  article: "Article",
  docs: "Docs",
  spec: "Spec",
  video: "Video",
  podcast: "Podcast",
  benchmark: "Benchmark",
  dataset: "Dataset",
  hardware: "Hardware",
  community: "Community",
  event: "Event",
  list: "List",
};

export function typeLabel(type: string): string {
  return TYPE_LABEL[type] ?? type;
}

export const PRICING_LABEL: Record<string, string> = { oss: "Open source", freemium: "Freemium", commercial: "Commercial" };
export const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  maintenance: "Maintenance",
  archived: "Archived",
  deprecated: "Deprecated",
};
