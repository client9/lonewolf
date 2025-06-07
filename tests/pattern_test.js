import test from "node:test";
import { strict as assert } from "node:assert";
import { Do, Table, Mean, Timing } from "../lonewolf.js";
import {
  Repeated,
  Pattern,
  MatchHead,
  MatchAnd,
  MatchNone,
  MatchType,
} from "../lonewolf.js";

test("MatchNone", (t) => {
  assert.strictEqual(0, MatchNone([], 0));
  assert.strictEqual(-1, MatchNone([1], 0));
});

test("MatchType", (t) => {
  assert.strictEqual(true, Pattern(MatchType(1), [1]));
  assert.strictEqual(true, Pattern(MatchType(""), ["foo"]));
  assert.strictEqual(false, Pattern(MatchType(""), [1]));
});

test("Repeated", (t) => {
  let m = Repeated(MatchHead(Number));
  assert.strictEqual(true, Pattern(m, [1, 2, 3]));
  assert.strictEqual(true, Pattern(m, [1]));
  assert.strictEqual(false, Pattern(m, ["junk", 1]));
  assert.strictEqual(false, Pattern(m, [1, "junk"]));

  m = MatchAnd(MatchHead(Number), MatchHead(String));
  assert.strictEqual(true, Pattern(m, [1, "foo"]));

  m = MatchAnd(Repeated(MatchHead(Number)), MatchHead(String));
  assert.strictEqual(true, Pattern(m, [1, 2, 3, "foo"]));

  // maximum
  m = Repeated(MatchHead(Number), 3);
  assert.strictEqual(true, Pattern(m, [1, 2, 3]));
  assert.strictEqual(true, Pattern(m, [1]));

  // exact
  m = Repeated(MatchHead(Number), [3]);
  assert.strictEqual(true, Pattern(m, [1, 2, 3]));
  assert.strictEqual(false, Pattern(m, [1, 2, 3, 4]));
  assert.strictEqual(false, Pattern(m, [1]));
});

test("Repeated Benchmark Explicit", (t) => {
  const n = 1000000;
  const m = MatchAnd(
    MatchHead(Number),
    MatchHead(Number),
    MatchHead(Number),
    MatchHead(Number),
  );
  const args = [1, 2, 3, 4];
  const elapsed = Mean(
    Table(() => Timing(() => Do(() => Pattern(m, args), n)), [10]),
  );

  console.log("Explicit: Time per iteration: ", n / elapsed);
});

test("Repeated Benchmark Repeated", (t) => {
  const n = 1000000;
  const m = Repeated(MatchHead(Number), [4]);
  const args = [1, 2, 3, 4];
  const elapsed = Mean(
    Table(() => Timing(() => Do(() => Pattern(m, args), n)), [10]),
  );
  console.log("Repeated MatchHead: Time per iteration: ", n / elapsed);
});

test("Repeated Benchmark Repeated Type", (t) => {
  const n = 1000000;
  const m = Repeated(MatchType(1), [4]);
  const args = [1, 2, 3, 4];
  const elapsed = Mean(
    Table(() => Timing(() => Do(() => Pattern(m, args), n)), [10]),
  );
  console.log("Repeated MatchType: Time per iteration: ", n / elapsed);
});
