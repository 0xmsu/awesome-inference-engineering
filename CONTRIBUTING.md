# Contributing

Thanks for helping keep this map of inference engineering accurate and current. The list is **data-driven**: every entry lives in a YAML file under [`data/entries/`](data/entries/), and the README, the website, and the JSON export are generated from it. Never edit `README.md` by hand.

## Quick start

```sh
pnpm install
pnpm add-entry https://github.com/owner/repo --section engines/datacenter   # creates a skeleton entry
# edit data/entries/engines.yml: write the description, set tags
pnpm build      # regenerates README.md and the exports
pnpm check      # schema, style rules, lint, types, tests
```

Valid section ids are listed in [`data/taxonomy.yml`](data/taxonomy.yml) (`<section>/<subsection>`), and tags in [`data/tags.yml`](data/tags.yml).

Prefer not to touch YAML? [Open an issue](../../issues/new/choose) with the "Add a resource" form instead.

## What belongs here

An entry must make the map more useful to someone who builds or runs inference systems.

| Kind | Criteria |
| --- | --- |
| Open-source tools | Committed to in the last 12 months, documented, OSI-licensed, and showing real adoption (a meaningful community, known production use, or the reference implementation of a landmark paper). |
| Free proprietary or source-available tools | Central to the ecosystem (for example TensorRT or LM Studio) and freely available. The entry shows the license, and the description says when it is not OSI-approved. |
| Commercial products | Publicly available, self-serve, with technical documentation. Marked 💲. No affiliate or referral links. |
| Papers | Introduced a mechanism that is now widely used, or has clear production impact. Link the canonical page (proceedings or arXiv abstract); add the code link in `paper.code`. This list is not an exhaustive paper index. |
| Articles, talks, courses | Deep technical content with measurements or implementation detail. No marketing pages, listicles, or shallow summaries. |

**Prefer primary sources:** the paper that introduced a mechanism, the specification or official documentation that defines it, the repository that implements it, or a first-hand report with code and measurements.

## Style guide

- `description`: one sentence, 20–160 characters, in **your own words**, starting with a capital letter and ending with a period. Do not start with the entry's name.
- Neutral tone: no superlatives ("the fastest", "blazing", "revolutionary") and no emoji.
- **Performance numbers** only with their context: hardware, workload, precision, baseline. Without that context, leave the number out.
- Place each entry in exactly one subsection: the layer it primarily belongs to. Generic tools go in their layer (vLLM → Inference Engines); modality-specific tools go under Verticals (whisper.cpp → Speech). Cross-cutting views come from `tags`.
- Order within a subsection is the curator's order; put the most important entries first. Editor's picks (`featured: true`) are limited to three per subsection.
- Fast-moving claims (frontier hardware, pre-release software) get a `verified: YYYY-MM-DD` date.

## Lifecycle

- `status: maintenance` shows ⚠️; name a `successor` when there is one.
- `status: archived` or `deprecated` removes the entry from the README but keeps it on the website, so links from elsewhere still resolve.
- A weekly job refreshes GitHub metadata and opens a PR for archived, stale, renamed, or missing repositories. A weekly link check opens an issue for broken links.

## Sources and attribution

We use other curated lists as **discovery sources**, listed in [`data/sources.yml`](data/sources.yml). From them we take links and facts, never descriptions, section prose, or ordering. Record the source with `via: [source-id]` on every entry found there, so provenance stays in the data. A monthly job reports new links in those lists as candidates; a human decides what to add.

## AI-assisted contributions

AI tools are welcome as long as a human has checked every link and every claim before opening the PR. Say in the PR description that you used AI assistance. Bulk, unverified, or automated submissions are closed. [`AGENTS.md`](AGENTS.md) describes the workflow for coding agents.

## Conflicts of interest

If you work for, invest in, or are paid by the project or company you are adding, say so in the PR. Vendor submissions are fine when they meet the same criteria. There is no paid placement.

## Code of conduct

This project follows the [Contributor Covenant 3.0](CODE_OF_CONDUCT.md).
