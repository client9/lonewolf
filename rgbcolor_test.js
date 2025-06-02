import test from "node:test";
import { strict as assert } from "node:assert";

import { RGB } from "./color.js";

test("RGB, normal", (t) => {
  assert.deepEqual(RGB(1, 1, 1, 1), new Expr(RGB, 1, 1, 1, 1));
});
test("RGB, no alpha", (t) => {
  assert.deepEqual(RGB(1, 1, 1), new Expr(RGB, 1, 1, 1, 1));
});
test("RGB, clamped, above", (t) => {
  assert.deepEqual(RGB(255, 255, 255, 255), new Expr(RGB, 1, 1, 1, 1));
});
test("RGB, clamped, below", (t) => {
  assert.deepEqual(RGB(-255, -255, -255, -255), new Expr(RGB, 0, 0, 0, 0));
});
