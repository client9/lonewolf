
import { Eval, Call, Define } from "./dispatch.js";
import Expr from "./Expr.js";
import Clamp from "./Clamp.js";

function clamp01(x) {
    return Clamp(x, 0, 1);
}

export default function HSLColor(...args) {
  return Call(HSLColor, ...Eval(args));
}

Define(HSLColor, "Number Number Number", function (a, b, c) {
  return new Expr(HSLColor, Clamp(a, 0, 360), clamp01(b), clamp01(c), 1.0);
});
Define(HSLColor, "Number Number Number Number", function (a, b, c) {
  return new Expr(HSLColor, Clamp(a, 0, 360), clamp01(b), clamp01(c), clamp01(d));
});
