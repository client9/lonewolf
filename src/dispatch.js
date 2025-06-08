import Head from "./Head.js";
import Expr from "./Expr.js";
import { Pattern } from "./pattern.js";
/**
 * For basic JS types, this will do nothing, and just return the input
 * For arrays, it will create a new array Eval-ing each element
 * For Exprs it will evaluate the expressions.
 *
 * @param {*}
 * @returns {*}
 */
export function Eval(arg) {
  if (arg instanceof Expr) {
    return arg.head(...arg);
  }
  if (Array.isArray(arg)) {
    return arg.map((x) => Eval(x));
  }
  return arg;
}

//----------------------

var registry = new Map();

export function Define(sym, pattern, fn) {
  let patterns = registry.get(sym);
  if (!patterns) {
    patterns = [];
  }
  if (pattern) {
    patterns.push([pattern, pattern, fn]);
    registry.set(
      sym,
      patterns.sort((a, b) => b[1].rank - a[1].rank),
    );
  } else {
    return patterns.map((x) => x[1]);
  }
}

export function Call(sym, ...args) {
  let patterns = registry.get(sym);
  if (!patterns) {
    throw new Error(sym.name + ":  no definitions found");
    //return new Expr(sym, ...args)
  }
  let f = patterns.find((x) => Pattern(x[1], args));
  if (!f) {
    // this is the calling signature
    const sig = args.map((x) => Head(x)).join(" ");
    throw new Error(sym.name + ": no matching for signature of (" + sig + ")");
    //return new Expr(sym, ...args)
  }
  return f[2](...args);
}
