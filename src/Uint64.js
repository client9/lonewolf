import { Eval, Call, Define } from "./dispatch.js";
import Expr from "./Expr.js";
import Plus from "./Plus.js";
import BitXor from "./BitXor.js";
import BitAnd from "./BitAnd.js";
import BitOr from "./BitOr.js";
import Times from "./Times.js";
import ToString from "./ToString.js";
import { MatchAnd, MatchHead, MatchType } from "./pattern.js";

import Table from "./Table.js";

export default function Uint64(...args) {
  return Call(Uint64, ...Eval(args));
}

const matchPair64 = MatchAnd(MatchHead(Uint64), MatchHead(Uint64));

const words = Table((x) => BigInt(x), [64]);

Define(Uint64, MatchHead(BigInt), function (val) {
  // todo check that it's positive
  return new Expr(Uint64, val);
});

Define(Uint64, MatchType(1), function (val) {
  // todo check that it's positive
  return new Expr(Uint64, BigInt.asUintN(64, BigInt(val)));
});

Define(ToString, MatchHead(Uint64), function (val) {
  return val[0].toString();
});

Define(Plus, matchPair64, function (a, b) {
  return new Expr(Uint64, BigInt.asUintN(64, a[0] + b[0]));
});

Define(Times, matchPair64, function (a, b) {
  return new Expr(Uint64, BigInt.asUintN(64, a[0] * b[0]));
});
Define(BitXor, matchPair64, function (a, b) {
  return new Expr(Uint64, BigInt.asUintN(64, a[0] ^ b[0]));
});
Define(BitAnd, matchPair64, function (a, b) {
  return new Expr(Uint64, BigInt.asUintN(64, a[0] & b[0]));
});
Define(BitOr, matchPair64, function (a, b) {
  return new Expr(Uint64, BigInt.asUintN(64, a[0] | b[0]));
});
/*
Define(ShiftRight, MatchAnd(MatchHead(Uint64),MatchType(1)), function (a, b) {
  return new Expr(BitWord64, BitInt.UintN(64, (a[0] >> words[b]))
});
*/
