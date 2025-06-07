import Expr from "./Expr.js";

/**
 * Returns the "head" of an input.
 * It's an Expr-aware super "typeof" function.
 * Always returns a string, never fails.
 *
 * @param {*}
 * @returns {string}
 */
export default function Head(x) {
  if (typeof x === "undefined") {
    return "undefined";
  }

  // TBD: object might be better
  if (x === null) {
    return "null";
  }
  if (x instanceof Expr) {
    return x.head.name || x.head.constructor.name;
  }

  if (x instanceof Function) {
    return x.name;
  }

  return x.constructor.name;
}
