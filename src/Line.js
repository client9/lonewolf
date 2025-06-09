import Expr from "./Expr.js";

export default function Line(...args) {
  return new Expr(Line, ...args);
}
