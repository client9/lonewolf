import StringJoin from "./StringJoin.js";
import Expr from "./Expr.js";


// why
//          ...body
// and not
//          body="" ?
//
export function HTMLTag(name, attrs = {}, ...body) {
  return StringJoin(
    "<",
    name,
    MapList(
      ([k, v]) => " " + k + '="' + HTMLEscape(v) + '"' + Object.entries(attrs),
    ),
    ">",
    body,
    "</",
    name,
    ">",
  );
}

