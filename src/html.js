export function HTMLEscape(str) {
  return str
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function HTMLUnescape(str) {
  return str
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

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

export function HTMLNode(name, attrs = {}, children = []) {
  return new Expr(HTMLNode, name, attrs, children);
}
export function HTMLTextNode(body) {
  return new Expr(HTMLTextNode, body);
}
