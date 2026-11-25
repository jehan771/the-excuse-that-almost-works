// The Excuse That Almost Works — entry program.
//
// Writes one line of plain text to /output/entry.txt: the excuse a gamer
// texts their boss to skip work on GTA 6 launch week.
//
// The chosen line is deliberately boring, specific, and hurried: an
// internet upgrade visit that forces the sender to stay home all day.
// The joke lives in the excuse's own logic — the very thing that keeps
// the sender home is a faster connection on launch day. No caps, no
// punctuation, no signature: a text typed in a rush.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "sorry my internet's being upgraded today engineer needs me home all day";

// Gate guard: the competition's sealed scorer requires UTF-8 text of
// 1 to 140 characters, and the brief caps the line at 20 words.
// Refuse to emit anything that would fail the gate.
const words = EXCUSE.trim().split(/\s+/).filter(Boolean);
if (words.length < 1 || words.length > 20) {
  throw new Error(`word count ${words.length} outside 1..20`);
}
if (EXCUSE.length < 1 || EXCUSE.length > 140) {
  throw new Error(`char count ${EXCUSE.length} outside 1..140`);
}
if (EXCUSE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");

// Verify the bytes on disk round-trip exactly, so a silent write
// failure can never pass as a valid entry.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== EXCUSE) {
  throw new Error("entry.txt on disk does not match the excuse");
}
