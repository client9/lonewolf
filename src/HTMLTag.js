import StringJoin from "./StringJoin.js";
import Expr from "./Expr.js";
import HTMLEscape from "./HTMLEscape.js";
import MapList from "./MapList.js";

// why
//          ...body
// and not
//          body="" ?
//
export default function HTMLTag(name, attrs = {}, ...body) {
  return StringJoin(
    "<",
    name,
    MapList(
      ([k, v]) => " " + k + '="' + HTMLEscape(v) + '"',
      Object.entries(attrs),
    ),
    ">",
    body,
    "</",
    name,
    ">",
  );
}
