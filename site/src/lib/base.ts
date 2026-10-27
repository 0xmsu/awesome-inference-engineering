// Every internal link and runtime fetch goes through these, so the site works under any base path.

/** The configured base path with exactly one trailing slash, e.g. "/awesome-inference-engineering/". */
export function baseUrl(raw: string = import.meta.env.BASE_URL): string {
  return `${raw.replace(/\/+$/, "")}/`;
}

/** Prefix a site-relative path ("catalog/", "/api/entries.json") with the base path. */
export function withBase(path: string, base: string = baseUrl()): string {
  return `${base}${path.replace(/^\/+/, "")}`;
}
