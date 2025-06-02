import test from "node:test";
import { strict as assert } from "node:assert";

import { RGB, CSSColor } from "./color.js";

test("CSSColor, RGB", (t) => {
  assert.deepEqual(CSSColor(RGB(1, 1, 1, 1)), "rgb(100% 100% 100%)");
});
test("CSSColor, RGB", (t) => {
  assert.deepEqual(CSSColor(RGB("FFF")), "rgb(100% 100% 100%)");
});
test("CSSColor, RGB, Alpha", (t) => {
  assert.deepEqual(CSSColor(RGB(1, 1, 1, 0)), "rgb(100% 100% 100% / 0%)");
});
