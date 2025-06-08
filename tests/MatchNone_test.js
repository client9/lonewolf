import test from "node:test";
import { strict as assert } from "node:assert";

import { MatchNone } from "../lonewolf.js";

test("MatchNone", (t) => {
  assert.strictEqual(MatchNone([], 0), 0);
  assert.strictEqual(MatchNone([1], 0), -1);
});
