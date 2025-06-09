import Expr from "./Expr.js";

export default function Disk(...args) {
  return new Expr(Disk, ...args);
}
