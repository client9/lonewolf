import test from "node:test";
import { strict as assert } from "node:assert";
import { RandomInteger, Table, Mean, Timing } from "../lonewolf.js";

test("Rando!", (t) => {
  console.log(Table(RandomInteger, 3, 3));

  console.log(Mean(Table(RandomInteger, 1000000)));
  console.log("----");
  let f = function (x, y) {
    return [x, y];
  };
  console.log(Table(f, [2], [3]));
});
