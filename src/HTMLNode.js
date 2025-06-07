export default function HTMLNode(name, attrs = {}, children = []) {
  return new Expr(HTMLNode, name, attrs, children);
}
