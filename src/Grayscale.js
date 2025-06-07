import { Eval, Call, Define } from "./dispatch.js";
import Expr from "./Expr.js";
import Clamp from "./Clamp.js";
import { MatchType } from "./pattern.js";

export default function Grayscale(...args) {
  return Call(Grayscale, ...Eval(args));
}

function clamp01(x) {
  return Clamp(x, 0, 1);
}

Define(Grayscale, MatchType(1), function (a) {
  return new Expr(Grayscale, a);
});
