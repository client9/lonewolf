import test from "node:test";
import { strict as assert } from "node:assert";

import { StringJoin } from "./string.js";

test("string join", (t) => {
  assert.strictEqual(StringJoin(["a", "b", "c"]), "abc");
  assert.strictEqual(StringJoin(["a", ["b"], "c"]), "abc");
});
