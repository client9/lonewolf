import { Eval, Call, Define } from "./dispatch.js";
import Expr from "./Expr.js";
import Clamp from "./Clamp.js";
import { Repeated, MatchHead } from "./pattern.js";

export default function RGBColor(...args) {
  return Call(RGBColor, ...Eval(args));
}

function clamp01(x) {
  return Clamp(x, 0, 1);
}

Define(RGBColor, Repeated(MatchHead(Number), [3]), function (a, b, c) {
  return new Expr(RGBColor, clamp01(a), clamp01(b), clamp01(c), 1.0);
});

Define(RGBColor, Repeated(MatchHead(Number), [4]), function (a, b, c, d) {
  return new Expr(RGBColor, clamp01(a), clamp01(b), clamp01(c), clamp01(d));
});
Define(RGBColor, MatchHead(String), function (hexstr) {
  let parts = [];
  if (hexstr.length == 3) {
    parts = hexstr.split("");
    parts = parts.map((x) => parseInt(x, 16) / 15);
  } else if (hexstr.length == 6) {
    parts = [
      parseInt(hexstr.slice(0, 2), 16) / 255.0,
      parseInt(hexstr.slice(2, 4), 16) / 255.0,
      parseInt(hexstr.slice(4, 6), 16) / 255.0,
    ];
  } else {
    throw new Error(this.name + ": got bogus hex string '" + hexstr + "'");
  }
  if (parts.find((x) => isNaN(x))) {
    throw new Error(this.name + ": got bogus hex string '" + hexstr + "'");
  }
  if (parts.length == 3) {
    parts.push(1.0);
  }
  return new Expr(RGBColor, ...parts);
});
