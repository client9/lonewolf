import { Eval, Call, Define } from "./dispatch.js";
import Expr from "./Expr.js";
import ToSVG from "./ToSVG.js";
import { Repeated, MatchExpr, MatchNone, MatchType } from "./pattern.js";

export default function Circle(...args) {
  return new Expr(Circle, ...args);
}
/*
Define(ToSVG, MatchExpr(Circle, MatchNone), function () {
  return '<circle cx="0" cy="0" r="1">';
});
*/
