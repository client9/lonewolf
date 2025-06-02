import test from "node:test";
import { strict as assert } from "node:assert";
import { StringRiffle } from "./string.js";

test("StringRiffle", (t) => {
  assert.strictEqual(StringRiffle(["1", "2", "3"]), "1 2 3");
  assert.strictEqual(StringRiffle([1, 2, 3]), "1 2 3");
  assert.strictEqual(
    StringRiffle([
      [1, 2, 3],
      [4, 5, 6],
    ]),
    "1 2 3\n4 5 6",
  );

  assert.strictEqual(StringRiffle([1, 2, 3], ","), "1,2,3");
  assert.strictEqual(StringRiffle([1, 2, 3], ["<", ",", ">"]), "<1,2,3>");
});
