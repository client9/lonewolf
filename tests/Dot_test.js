import test from "node:test";
import { strict as assert } from "node:assert";

import { Dot } from "../lonewolf.js";

test("Dot", (t) => {
  // vector . vector
  assert.strictEqual(Dot([1, 2], [3, 4]), 11);

  // matrix . matrix
  assert.deepEqual(
    Dot(
      [
        [3, -1, 30],
        [1, 3, 40],
        [0, 0, 1],
      ],
      [10, 10, 1],
    ),
    [50, 80, 1],
  );
});
