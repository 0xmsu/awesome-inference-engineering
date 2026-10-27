// Validates everything in data/ against the schemas and content rules.
// Usage: node scripts/validate.ts

import { loadDataset, sectionRefs } from "./lib/data.ts";
import { checkDataset } from "./lib/checks.ts";

const ds = loadDataset();
const { errors, warnings } = checkDataset(ds);

for (const w of warnings) console.warn(`warning: ${w}`);
for (const e of errors) console.error(`error: ${e}`);

const filled = new Set(ds.entries.map((e) => e.section));
const refs = sectionRefs(ds.taxonomy);
console.log(
  `${ds.entries.length} entries in ${filled.size}/${refs.size} sections · ${errors.length} errors · ${warnings.length} warnings`,
);
process.exit(errors.length ? 1 : 0);
