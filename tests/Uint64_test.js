import test from "node:test";
import { strict as assert } from "node:assert";

import { ToString, Plus, Uint64 } from "../lonewolf.js";

test("Uint64", (t) => {
  assert.deepEqual(Plus(Uint64(1), Uint64(3)), Uint64(4));
  assert.strictEqual(ToString(Uint64(123)), "123");
});
