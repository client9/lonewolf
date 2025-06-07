import test from "node:test";
import { strict as assert } from "node:assert";

import { Mean } from "../lonewolf.js";

test("Mean", (t) => {
  assert.strictEqual(Mean(1, 1, 2, 3, 3), 2);
  assert.strictEqual(Mean(), 0);
});
