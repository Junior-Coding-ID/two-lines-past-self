// Two Lines to Your Past Self — entry writer (v1).
// Writes the two-line warning to entry.txt in the grader output directory.
// The entry is exactly two lines: a warning about one specific moment, then
// one sentence on why that moment mattered and what changed because of it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "After Maya goes home, don't answer 'I did' when the principal asks who designed the library mural.";
const LINE_2 =
  "He took me at my word and put my name on the plaque, so Maya spent the rest of the year walking past her own work credited to me.";

// Gate: entry must be UTF-8 text of 1 to 280 characters (RULES.txt).
const GATE_MIN = 1;
const GATE_MAX = 280;

function buildEntry(): string {
  const entry = LINE_1 + "\n" + LINE_2 + "\n";
  const chars = [...entry].length;
  if (chars < GATE_MIN || chars > GATE_MAX) {
    throw new Error(
      `entry is ${chars} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`,
    );
  }
  const lines = entry.replace(/\n$/, "").split("\n");
  if (lines.length !== 2 || lines.some((l) => l.trim().length === 0)) {
    throw new Error("entry must be exactly two non-empty lines");
  }
  return entry;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), buildEntry(), "utf8");
}

main();
