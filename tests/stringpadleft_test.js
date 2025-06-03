import test from "node:test";
import { strict as assert } from "node:assert";

import { StringPadLeft } from "../lonewolf.js";

test("StringPadLeft", (t) => {
  assert.strictEqual(StringPadLeft("abc", 4, "-"), "-abc");
  assert.strictEqual(StringPadLeft("abcdef", "3", "-"), "abc");
});
