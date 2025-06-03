import test from "node:test";
import { strict as assert } from "node:assert";

import { StringJoin } from "../lonewolf.js";

test("StringJoin", (t) => {
  assert.strictEqual(StringJoin(["a", "b", "c"]), "abc");
  assert.strictEqual(StringJoin(["a", ["b"], "c"]), "abc");
});
