import { Define, Call, Eval } from "./dispatch.js";
import Expr from "./Expr.js";
import Option from "./Option.js";
import { Repeated, MatchHead, MatchOneAny } from "./pattern.js";

export default function Graphics(...args) {
  return Call(Graphics, ...Eval(args));
}

Define(
  Graphics,
  [MatchOneAny], // , Repeated(MatchHead(Option), [0, Infinity])],
  function (one, ...options) {
    return new Expr(Graphics, one, ...options);
  },
);
