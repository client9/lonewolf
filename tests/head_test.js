import test from "node:test";
import { strict as assert } from "node:assert";
import { Expr, Head } from "../lonewolf.js";

test("Head", (t) => {
  assert.strictEqual(Head(), "undefined");

  // unclear what the right behavior is
  // Object might be better
  assert.strictEqual(Head(null), "null");

  assert.strictEqual(Head(1), "Number");
  assert.strictEqual(Head(Number(1)), "Number");
  // NaN
  assert.strictEqual(Head(1 / 0), "Number");

  assert.strictEqual(Head([]), "Array");

  assert.strictEqual(Head({}), "Object");

  assert.strictEqual(Head(true), "Boolean");
  assert.strictEqual(Head(false), "Boolean");

  // named
  function foo() {}
  assert.strictEqual(Head(foo), "Function");

  // anonymous
  let x = function () {};
  assert.strictEqual(Head(x), "Function");

  // more a test of how javascript works.
  // "Number" is actually a function
  assert.strictEqual(Head(Number), "Function");

  assert.strictEqual(Head(new Expr(Head, 1)), "Head");
});
