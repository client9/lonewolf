import { Define, Call, Eval } from "./dispatch.js";
import Expr from "./Expr.js";
import Option from "./Option.js";
import Graphics from "./Graphics.js";
import { MatchHead } from "./pattern.js";

export default function FullGraphics(...args) {
  return Call(FullGraphics, ...Eval(args));
}

Define(FullGraphics, MatchHead(Graphics), function (g) {
  return g;
});
