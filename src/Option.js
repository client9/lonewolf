import { Eval, Call, Define } from "./dispatch.js";
import Expr from "./Expr.js";
import { MatchHead, MatchOneAny } from "./pattern.js";

export default function Option(...args) {
  return Call(Option, ...Eval(args));
}

Define(Option, [MatchHead(Symbol), MatchOneAny], function (a, b) {
  return new Expr(Option, a, b);
});
