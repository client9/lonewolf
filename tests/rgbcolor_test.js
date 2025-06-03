import test from "node:test";
import { strict as assert } from "node:assert";

import { Expr, RGBColor } from "../lonewolf.js";

test("RGBColor", (t) => {
  assert.deepEqual(RGBColor(1, 1, 1, 1), new Expr(RGBColor, 1, 1, 1, 1));
  assert.deepEqual(RGBColor(1, 1, 1), new Expr(RGBColor, 1, 1, 1, 1));
  assert.deepEqual(
    RGBColor(255, 255, 255, 255),
    new Expr(RGBColor, 1, 1, 1, 1),
  );
  assert.deepEqual(
    RGBColor(-255, -255, -255, -255),
    new Expr(RGBColor, 0, 0, 0, 0),
  );
});
