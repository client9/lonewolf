import Expr from "./Expr.js";

export default function Circle(...args) {
  return new Expr(Circle, ...args);
}
