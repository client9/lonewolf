import test from "node:test";
import { strict as assert } from "node:assert";

import { StringPadLeft } from "./string.js";

test("StringPadLeft, extend", (t) => {
  assert.strictEqual(StringPadLeft("abc", 4, "-"), "-abc");
});

test("StringPadLeft, no action", (t) => {
  assert.strictEqual(StringPadLeft("abcdef", "3", "-"), "abc");
});
