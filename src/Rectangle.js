import Expr from "./Expr.js";

export default function Rectangle(...args) {
  return new Expr(Rectangle, ...args);
}
