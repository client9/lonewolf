import Take from "./Take.js";
import MapList from "./MapList.js";
import StringRiffle from "./StringRiffle.js";
import Last from "./Last.js";
import { MatchHead } from "./pattern.js";
import RGBColor from "./RGBColor.js";
import HSLColor from "./HSLColor.js";
import Grayscale from "./Grayscale.js";

import { Define, Call, Eval } from "./dispatch.js";

export default function CSSColor(...args) {
  return Call(CSSColor, ...Eval(args));
}

Define(CSSColor, MatchHead(RGBColor), function (val) {
  let rgbVal = MapList((x) => Math.round(x * 100) + "%", val);

  // skip alpha - emit 3 values
  if (val[3] == 1.0) {
    return "rgb(" + StringRiffle(Take(rgbVal, 3)) + ")";
  }

  // with alpha
  return "rgb(" + StringRiffle(Take(rgbVal, 3)) + " / " + Last(rgbVal) + ")";
});

Define(CSSColor, MatchHead(Grayscale), function (val) {
  let out = "hsl(0 0 " + Math.round(100*val[0]).toString() + ")";
  return out;
});

Define(CSSColor, MatchHead(HSLColor), function (val) {
  let cssval = MapList((x) => Math.round(x).toString(), val);

  let out =
    "hsl(" +
    Math.round(val[0]).toString() +
    " " +
    Math.round(val[1] * 100).toString() +
    " " +
    Math.round(val[2] * 100).toString();
  if (val[3] != 1.0) {
    out += " / " + Math.round(val[3] * 100).toString();
  }
  out += ")";
  return out;
});
