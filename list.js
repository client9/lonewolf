import * as _expr from "./expr.js";
Object.assign(globalThis, _expr);

export function First(x) {
  return x.at(0);
}

export function Rest(x) {
  return x.slice(1);
}

export function Take(x, n) {
  return x.slice(0, n);
}

export function Last(x) {
  return x.at(-1);
}

export function Reverse(x) {
    return x.toReversed()
}

export function Partition(arr, n) {
  if (n <= 0) {
    return null;
  }
  let out = [];
  for (let i = 0, len = arr.length; i < len; i += n) {
    out.push(arr.slice(i, i + n));
  }
  return out;
}

export function Range(n) {
  return Array.from(Array(n).keys());
}

// Optimize
export function ArrayDepth(a) {
    return Dimensions(a).length
}

export function Dimensions(a, n=999, out=[]) {
    if (n <= 0 || (! Array.isArray(a))) {
        return out
    }
    out.push(a.length)
    // all entries are arrays with same length
    if ( Equal(MapList((x) => (ListQ(x) ? x.length : -1), a))) {
        return Dimensions(a[0], n-1, out)
    }
    return out
}
