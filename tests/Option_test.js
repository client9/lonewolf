import test from "node:test";
import { strict as assert } from "node:assert";

import { Expr, Option } from "../lonewolf.js";

test("Option", (t) => {
  let x = Symbol.for("x");
  assert.deepEqual(Option(x, 1), new Expr(Option, x, 1));

  let y = Symbol.for("y");
  let o1 = Option(x, 1);
  let o2 = Option(y, 2);

  // test merging and making option map
  // this works since Option is really a subclass of Array
  let m1 = new Map([o1, o2]);
  assert.strictEqual(m1.get(x), 1);
  assert.strictEqual(m1.get(y), 2);
});
