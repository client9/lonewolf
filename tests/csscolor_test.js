import test from "node:test";
import { strict as assert } from "node:assert";

import { RGBColor, CSSColor } from "../lonewolf.js";

test("CSSColor", (t) => {
  assert.deepEqual(CSSColor(RGBColor(1, 1, 1, 1)), "rgb(100% 100% 100%)");
  assert.deepEqual(CSSColor(RGBColor("FFF")), "rgb(100% 100% 100%)");
  assert.deepEqual(CSSColor(RGBColor(1, 1, 1, 0)), "rgb(100% 100% 100% / 0%)");
});
