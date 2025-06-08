import test from "node:test";
import { strict as assert } from "node:assert";

import { ListQ } from "../lonewolf.js";

test("ListQ", (t) => {
  assert.strictEqual(true, ListQ([1, 2, 3]));
  assert.strictEqual(false, ListQ(1));
  assert.strictEqual(true, ListQ([[1], [2], [3]]));
});
