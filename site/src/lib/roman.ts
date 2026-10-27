// Roman numerals for section and chapter numbers.

const TABLE: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

/** 1 -> "I", 14 -> "XIV", 19 -> "XIX". */
export function roman(n: number): string {
  let rest = Math.max(0, Math.floor(n));
  let out = "";
  for (const [value, glyph] of TABLE) {
    while (rest >= value) {
      out += glyph;
      rest -= value;
    }
  }
  return out;
}
