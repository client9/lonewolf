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
  return x.toReversed();
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

export function Table(fn, spec) {
    if (Number.isSafeInteger(spec)) {
        return new Array(spec).fill(fn)
    }
    let imin, imax, inc;
    if (Array.isArray(spec)) {
        if (spec.length == 1) {
            [imin, imax, inc]  = [0, spec[0], 1]
        } else if (spec.length == 2) {
            [imin,imax, inc] =  [spec[0], spec[1], 1]
        } else if (spec.length == 3) {
            [imin,imax, inc] = spec
        } else {
            throw new Error("Unknown Table spec of " + spec)
        }
    }
    let ary = new Array(Math.floor((imax-imin)/inc))
    //console.log(">>>>", typeof fn)
    //console.log(fn instanceof Function)
    if (typeof fn == 'function') { // || (fn instanceof Function)) {
        for (let i = imin, j = 0; i < imax; i += inc, j++) {
            ary[j] = fn(i)
        }
    } else {
        ary.fill(fn)
    }
    return ary
}

// Optimize
export function ArrayDepth(a) {
  return Dimensions(a).length;
}

export function Dimensions(a, n = 999, out = []) {
  if (n <= 0 || !Array.isArray(a)) {
    return out;
  }
  out.push(a.length);
  // all entries are arrays with same length
  if (Equal(MapList((x) => (ListQ(x) ? x.length : -1), a))) {
    return Dimensions(a[0], n - 1, out);
  }
  return out;
}
