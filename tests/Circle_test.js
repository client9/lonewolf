import test from "node:test";
import { strict as assert } from "node:assert";

import { Graphics, Circle, ToSVG } from "../lonewolf.js";

test("Circle SVG", (t) => {
  assert.strictEqual(
    ToSVG(Graphics(Circle())),
    '<circle cx="0" cy="0" r="1"/>',
  );
});
