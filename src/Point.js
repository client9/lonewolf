import Expr from "./Expr.js";

export default function Point(...args) {
  return new Expr(Point, ...args);
}
