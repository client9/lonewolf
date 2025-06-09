import Expr from "./Expr.js";

export default function Polygon(...args) {
  return new Expr(Polygon, ...args);
}
