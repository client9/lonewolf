import test from "node:test";
import { strict as assert } from "node:assert";

import { Table } from "../lonewolf.js";

test("Table", (t) => {
  assert.deepEqual(Table(1, 3), [1, 1, 1]);
  assert.deepEqual(
    Table((x) => x, [3]),
    [0, 1, 2],
  );
  assert.deepEqual(
    Table((x) => x, [1, 4]),
    [1, 2, 3],
  );
  assert.deepEqual(
    Table((x) => x, [1, 6, 2]),
    [1, 3, 5],
  );
});
