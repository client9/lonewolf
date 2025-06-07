import test from "node:test";
import { strict as assert } from "node:assert";

import { MatchHead } from "../lonewolf.js";

test("MatchHead", (t) => {
  var m = MatchHead(Number);
  var argNum = [1];
  var argStr = ["foo"];
  assert.strictEqual(m(argNum, 0), 1);
  assert.strictEqual(m(argStr, 0), -1);

  m = MatchHead(String);
  assert.strictEqual(m(argStr, 0), 1);
});
