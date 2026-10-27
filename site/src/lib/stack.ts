// Fig. 1 on the home page: the layers of the stack from the request down to the silicon, then the
// sections that cut across every layer and the ones that are for reading. Pure data plus a resolver.

export interface LayerDef {
  name: string;
  /** Section ids, in display order. */
  sections: readonly string[];
  /** On the request path (drawn against the axis) or off it. */
  onPath: boolean;
}

export const LAYERS: readonly LayerDef[] = [
  { name: "Applications", sections: ["verticals", "providers"], onPath: true },
  { name: "Gateways", sections: ["gateways"], onPath: true },
  { name: "Serving", sections: ["serving"], onPath: true },
  { name: "Engines", sections: ["engines", "edge"], onPath: true },
  { name: "Techniques", sections: ["compression", "decoding", "kv-cache", "scheduling"], onPath: true },
  { name: "Kernels & compilers", sections: ["kernels", "compilers"], onPath: true },
  { name: "Hardware", sections: ["hardware"], onPath: true },
  { name: "Across every layer", sections: ["benchmarking", "observability"], onPath: false },
  { name: "For reading", sections: ["start-here", "learning", "case-studies"], onPath: false },
];

/** Short names for inline use, where the full section title would crowd the row. */
export const SHORT: Readonly<Record<string, string>> = {
  verticals: "Verticals",
  providers: "Providers & clouds",
  gateways: "Gateways & routing",
  serving: "Distributed serving",
  engines: "Inference engines",
  edge: "Edge, mobile & browser",
  compression: "Compression",
  decoding: "Decoding",
  "kv-cache": "KV cache & attention",
  scheduling: "Scheduling & parallelism",
  kernels: "Kernels & GPU programming",
  compilers: "Compilers & runtimes",
  hardware: "Hardware & accelerators",
  benchmarking: "Benchmarking",
  observability: "Observability",
  "start-here": "Start here",
  learning: "Learning",
  "case-studies": "Case studies",
};

export interface StackSection {
  id: string;
  short: string;
  count: number;
}

export interface StackLayer {
  name: string;
  onPath: boolean;
  sections: StackSection[];
}

/** Layers with their sections resolved. A section missing from LAYERS joins the last layer, so none is lost. */
export function resolveStack(sections: readonly { id: string; title: string }[], counts: Readonly<Record<string, number>>): StackLayer[] {
  const byId = new Map(sections.map((s) => [s.id, s]));
  const used = new Set<string>();
  const toSection = (id: string): StackSection | undefined => {
    const s = byId.get(id);
    if (!s) return undefined;
    used.add(id);
    return { id, short: SHORT[id] ?? s.title, count: counts[id] ?? 0 };
  };
  const layers: StackLayer[] = LAYERS.map((l) => ({
    name: l.name,
    onPath: l.onPath,
    sections: l.sections.map(toSection).filter((s): s is StackSection => Boolean(s)),
  }));
  const last = layers[layers.length - 1];
  for (const s of sections) {
    const resolved = used.has(s.id) ? undefined : toSection(s.id);
    if (resolved && last) last.sections.push(resolved);
  }
  return layers.filter((l) => l.sections.length > 0);
}
