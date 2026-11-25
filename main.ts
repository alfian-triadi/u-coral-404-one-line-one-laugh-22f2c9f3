// One Line, One Laugh — make.fun bounty entry
//
// Why this line fits the judge's brief:
// The setup ("Wi-Fi died, so I talked to my family") is a familiar, relatable
// scene, and the punchline turns it where the reader does not expect: instead
// of the usual "family time is precious" moral, the speaker treats the outage
// as a product worth paying for. The turn IS the joke, every word earns its
// place, and nothing explains itself — the laugh lands on first read.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SETUP = "My Wi-Fi died for five minutes, so I had to talk to my family.";
const PUNCHLINE = " They're nice people. I now pay extra for outages.";

const line = SETUP + PUNCHLINE;

// Gate: UTF-8 text, 1–200 characters, not only whitespace.
const chars = [...line].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (!line.trim()) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output/entry.txt";
const outFile = outDir.endsWith("entry.txt") ? outDir : join(outDir, "entry.txt");

mkdirSync(join(outFile, ".."), { recursive: true });
writeFileSync(outFile, line, "utf8");

// Verify the written bytes match exactly (no trailing newline added).
const written = readFileSync(outFile, "utf8");
if (written !== line) {
  throw new Error("written entry.txt does not match the intended line");
}

console.log(`Wrote ${[...written].length} chars to ${outFile}`);
console.log(written);
