import test from "node:test";
import { strict as assert } from "node:assert";

import { Expr, Grayscale } from "../lonewolf.js";

test("RGBColor", (t) => {
  assert.deepEqual(Grayscale(1), new Expr(Grayscale, 1));
  assert.deepEqual(Grayscale(0), new Expr(Grayscale, 0));
});
