import test from "node:test";
import { strict as assert } from "node:assert";

import { VectorQ } from "../lonewolf.js";

test("VectorQ", (t) => {
  assert.strictEqual(true, VectorQ([1, 2, 3]));
  assert.strictEqual(false, VectorQ(1));
  assert.strictEqual(false, VectorQ([[1], [2], [3]]));
});
