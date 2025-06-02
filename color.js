import * as _expr from "./expr.js";
import * as _func from "./functional.js";
import * as _str from "./string.js";
import * as _list from "./list.js";
Object.assign(globalThis, _expr);
Object.assign(globalThis, _func);
Object.assign(globalThis, _list);
Object.assign(globalThis, _str);

export function RGB(...args) {
  return Call(RGB, ...Eval(args));
}

function clamp01(x) {
  if (x < 0) {
    return 0;
  }
  if (x > 1) {
    return 1;
  }
  return x;
}

Define(RGB, "Number Number Number", function (a, b, c) {
  return new Expr(RGB, clamp01(a), clamp01(b), clamp01(c), 1.0);
});

Define(RGB, "Number Number Number Number", function (a, b, c, d) {
  return new Expr(RGB, clamp01(a), clamp01(b), clamp01(c), clamp01(d));
});
Define(RGB, "String", function (hexstr) {
  let parts = [];
  if (hexstr.length == 3) {
    parts = hexstr.split("");
    parts = parts.map((x) => parseInt(x, 16) / 15);
  } else if (hexstr.length == 6) {
    parts = [
      parseInt(hexstr.slice(0, 2), 16) / 255.0,
      parseInt(hexstr.slice(2, 4), 16) / 255.0,
      parseInt(hexstr.slice(4, 6), 16) / 255.0,
    ];
  } else {
    throw new Error(this.name + ": got bogus hex string '" + hexstr + "'");
  }
  if (parts.find((x) => isNaN(x))) {
    throw new Error(this.name + ": got bogus hex string '" + hexstr + "'");
  }
  if (parts.length == 3) {
    parts.push(1.0);
  }
  return new Expr(RGB, ...parts);
});

export function CSSColor(...args) {
  return Call(CSSColor, ...Eval(args));
}

Define(CSSColor, "RGB", function (val) {
  let rgbVal = MapList((x) => Math.round(x * 100) + "%", val);

  // skip alpha - emit 3 values
  if (val[3] == 1.0) {
    return "rgb(" + StringRiffle(Take(rgbVal, 3)) + ")";
  }

  // with alpha
  return "rgb(" + StringRiffle(Take(rgbVal, 3)) + " / " + Last(rgbVal) + ")";
});
