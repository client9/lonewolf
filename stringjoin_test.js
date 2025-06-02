import test from "node:test";
import { strict as assert } from "node:assert";

import { StringJoin } from "./string.js";

test("string join, no separator, implied", (t) => {
  assert.strictEqual(StringJoin(["a", "b", "c"]), "abc");
});

test("string join, no separator, explicit", (t) => {
  assert.strictEqual(StringJoin(["a", "b", "c"], ""), "abc");
});

test("string join, separator, explicit", (t) => {
  assert.strictEqual(StringJoin(["a", "b", "c"], " "), "a b c");
});
