import { Eval, Call, Define } from "./dispatch.js";
import Expr from "./Expr.js";

import { Repeated, MatchAny } from "./pattern.js";

export default function ToString(...args) {
  return Call(ToString, ...Eval(args));
}

Define(ToString, MatchAny, function (arg) {
  if (typeof arg === "string") {
    return arg;
  }
  // works for most types.. object TBD
  return JSON.stringify(arg);
});
