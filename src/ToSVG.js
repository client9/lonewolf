import { Define, Call, Eval } from "./dispatch.js";
import FullGraphics from "./FullGraphics.js";
import Graphics from "./Graphics.js";
import { MatchHead } from "./pattern.js";
import Head from "./Head.js";

export default function ToSVG(...args) {
  return Call(ToSVG, ...Eval(args));
}

Define(ToSVG, MatchHead(Graphics), function (g) {
  // convert everything (frames, axes, etc) to pure graphic primitives
  g = FullGraphics(g);

  let out = [];
  for (let primitive of g) {
    switch (Head(primitive)) {
      case "Circle":
        let x = 0,
          y = 0,
          r = 1;
        if (primitive.length > 0) {
          [x, y] = primitive[0];
        }
        if (primitive.length > 1) {
          r = primitive[1];
        }
        out.push(`<circle cx="${x}" cy="${y}" r="${r}"></circle>`);
    }
  }
  return out.join("");
});
