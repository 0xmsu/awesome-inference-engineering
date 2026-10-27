// Generates README.md from data/.
// Usage: node scripts/build-readme.ts [--check]
//   --check  fail if README.md is not up to date instead of writing it.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, loadDataset } from "./lib/data.ts";
import { renderReadme } from "./lib/readme.ts";

const path = join(ROOT, "README.md");
const next = renderReadme(loadDataset());

if (process.argv.includes("--check")) {
  const current = existsSync(path) ? readFileSync(path, "utf8") : "";
  if (current !== next) {
    console.error("README.md is out of date. Run `pnpm build:readme` and commit the result.");
    process.exit(1);
  }
  console.log("README.md is up to date.");
} else {
  writeFileSync(path, next);
  console.log(`Wrote README.md (${next.split("\n").length} lines).`);
}
