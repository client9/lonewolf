export function StringPadLeft(str, n, pad = " ") {
  // easy optimization here
  // str.length  + x * padding.length = n
  // x* pad.len = n - str.len
  const x = Math.ceil((n - str.length) / pad.length);
  if (x > 0) {
    str = new Array(x).fill(pad).join("") + str;
  }
  if (str.length > n) {
    return str.slice(0, n);
  }
  return str;
}
