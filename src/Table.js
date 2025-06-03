export default function Table(fn, spec) {
  if (Number.isSafeInteger(spec)) {
    return new Array(spec).fill(fn);
  }
  let imin, imax, inc;
  if (Array.isArray(spec)) {
    if (spec.length == 1) {
      [imin, imax, inc] = [0, spec[0], 1];
    } else if (spec.length == 2) {
      [imin, imax, inc] = [spec[0], spec[1], 1];
    } else if (spec.length == 3) {
      [imin, imax, inc] = spec;
    } else {
      throw new Error("Unknown Table spec of " + spec);
    }
  }
  let ary = new Array(Math.floor((imax - imin) / inc));
  //console.log(">>>>", typeof fn)
  //console.log(fn instanceof Function)
  if (typeof fn == "function") {
    // || (fn instanceof Function)) {
    for (let i = imin, j = 0; i < imax; i += inc, j++) {
      ary[j] = fn(i);
    }
  } else {
    ary.fill(fn);
  }
  return ary;
}
