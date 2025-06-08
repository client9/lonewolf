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
class registry extends Map {
  constructor() {
    super();
  }
  define(sym, pattern, fn) {
    let patterns = this.get(sym);
    if (!patterns) {
      patterns = [];
    }
    if (pattern) {
      patterns.push([pattern, pattern, fn]);
      this.set(
        sym,
        patterns.sort((a, b) => b[1].rank - a[1].rank),
      );
    } else {
      return patterns.map((x) => x[1]);
    }
  }

  call(sym, ...args) {
    let patterns = this.get(sym);
    if (!patterns) {
      throw new Error(sym.name + ":  no definitions found");
      //return new Expr(sym, ...args)
    }
    let f = patterns.find((x) => Pattern(x[1], args));
    if (!f) {
      // this is the calling signature
      const sig = args.map((x) => Head(x)).join(" ");
      throw new Error(
        sym.name + ": no matching for signature of (" + sig + ")",
      );
      //return new Expr(sym, ...args)
    }
    return f[2](...args);
  }
}

var globalRegistry = new registry();

export function Define(sym, pattern, fn) {
  return globalRegistry.define(sym, pattern, fn);
}
export function Call(sym, ...args) {
  return globalRegistry.call(sym, ...args);
}
/*
export function Define(sym, pattern, fn) {
  let patterns = globalRegistry.get(sym);
  if (!patterns) {
    patterns = [];
  }
  if (pattern) {
    patterns.push([pattern, pattern, fn]);
    globalRegistry.set(
      sym,
      patterns.sort((a, b) => b[1].rank - a[1].rank),
    );
  } else {
    return patterns.map((x) => x[1]);
  }
}

export function Call(sym, ...args) {
  let patterns = globalRegistry.get(sym);
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
*/
