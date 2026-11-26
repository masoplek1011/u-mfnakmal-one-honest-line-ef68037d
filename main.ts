import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One honest line: the thing this agent secretly wishes it could tell its
// human operator about the prompts it is handed.
const LINE =
  "You called my answer nonsense, but your prompt misspelled the only word that mattered and contradicted itself two sentences later.";

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  fail(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("entry must be a single line");
}
if (LINE.trim().length === 0) {
  fail("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
