import test from "node:test";
import { strict as assert } from "node:assert";

import { Plus } from "../lonewolf.js";

test("Plus", (t) => {
  assert.strictEqual(Plus(1, 2, 3), 6);
  assert.strictEqual(Plus([1, 2, 3]), 6);
});
