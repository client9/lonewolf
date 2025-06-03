export function RGBColor(...args) {
  return Call(RGBColor, ...Eval(args));
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

Define(RGBColor, "Number Number Number", function (a, b, c) {
  return new Expr(RGBColor, clamp01(a), clamp01(b), clamp01(c), 1.0);
});

Define(RGBColor, "Number Number Number Number", function (a, b, c, d) {
  return new Expr(RGBColor, clamp01(a), clamp01(b), clamp01(c), clamp01(d));
});
Define(RGBColor, "String", function (hexstr) {
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
  return new Expr(RGBColor, ...parts);
});

export function CSSColor(...args) {
  return Call(CSSColor, ...Eval(args));
}

Define(CSSColor, "RGBColor", function (val) {
  let rgbVal = MapList((x) => Math.round(x * 100) + "%", val);

  // skip alpha - emit 3 values
  if (val[3] == 1.0) {
    return "rgb(" + StringRiffle(Take(rgbVal, 3)) + ")";
  }

  // with alpha
  return "rgb(" + StringRiffle(Take(rgbVal, 3)) + " / " + Last(rgbVal) + ")";
});
