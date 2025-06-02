import test from "node:test";
import { strict as assert } from "node:assert";
import { Head } from "./expr.js";

test("head undefined", (t) => {
  assert.strictEqual(Head(), "undefined");
});

// unclear what the right behavior is
test("head null", (t) => {
  assert.strictEqual(Head(null), "null");
});
test("head number", (t) => {
  assert.strictEqual(Head(1), "Number");
  assert.strictEqual(Head(Number(1)), "Number");
  // NaN
  assert.strictEqual(Head(1 / 0), "Number");
});
test("head array", (t) => {
  assert.strictEqual(Head([]), "Array");
});
test("head object literal", (t) => {
  assert.strictEqual(Head({}), "Object");
});
test("head bool", (t) => {
  assert.strictEqual(Head(true), "Boolean");
  assert.strictEqual(Head(false), "Boolean");
});
