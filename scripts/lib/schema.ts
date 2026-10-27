// JSON Schema validation of the YAML data files.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import type { ErrorObject, ValidateFunction } from "ajv";
import { ROOT } from "./data.ts";

// ajv and ajv-formats are CommonJS; require() avoids default-export interop issues.
const require = createRequire(import.meta.url);
const Ajv2020 = require("ajv/dist/2020") as typeof import("ajv/dist/2020.js").default;
const addFormats = require("ajv-formats") as typeof import("ajv-formats").default;

export type SchemaName = "entry" | "taxonomy" | "tags" | "sources" | "glossary";

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

const validators = new Map<SchemaName, ValidateFunction>();

function validator(name: SchemaName): ValidateFunction {
  const cached = validators.get(name);
  if (cached) return cached;
  const schema = JSON.parse(readFileSync(join(ROOT, "schema", `${name}.schema.json`), "utf8"));
  const fn = ajv.compile(schema);
  validators.set(name, fn);
  return fn;
}

export function formatErrors(errors: ErrorObject[] | null | undefined): string[] {
  return (errors ?? []).map((e) => `${e.instancePath || "/"} ${e.message ?? "is invalid"}${paramsHint(e)}`);
}

function paramsHint(e: ErrorObject): string {
  if (e.keyword === "additionalProperties") return ` (${String(e.params["additionalProperty"])})`;
  if (e.keyword === "enum") return ` (${(e.params["allowedValues"] as unknown[]).join(", ")})`;
  return "";
}

/** Validates data against a schema and returns human-readable errors (empty when valid). */
export function validateSchema(name: SchemaName, data: unknown): string[] {
  const fn = validator(name);
  return fn(data) ? [] : formatErrors(fn.errors);
}
