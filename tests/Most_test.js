import test from "node:test";
import { strict as assert } from "node:assert";

import { Most } from "../lonewolf.js";

test("Most", (t) => {
  assert.deepEqual(Most([1, 2, 3]), [1, 2]);
});
