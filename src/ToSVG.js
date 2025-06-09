import { Define, Call, Eval } from "./dispatch.js";
import FullGraphics from "./FullGraphics.js";
import Graphics from "./Graphics.js";
import { MatchHead } from "./pattern.js";
import Head from "./Head.js";

export default function ToSVG(...args) {
  return Call(ToSVG, ...Eval(args));
}

function makePoint(pt) {
  let cx,
    cy = pt;
  let rx = 0.1;
  return `<circle cx="${cx}" cy="${cy}" r="${rx}"/>`;
}

function makeLinePoints(pts) {
  return StringRiffle(
    MapList(
      (x) =>
        StringRiffle(
          Map((y) => y.toString(), x),
          ",",
        ),
      pts,
    ),
    " ",
  );
}

Define(ToSVG, MatchHead(Graphics), function (g) {
  // convert everything (frames, axes, etc) to pure graphic primitives
  g = FullGraphics(g);

  let out = [];
  for (let primitive of g) {
    switch (Head(primitive)) {
      case "Point":
        if (VectorQ(primitive[0])) {
          out.push(makePoint(x));
        } else {
          out.push(
            StringRiffle(
              Map((x) => makePoint(x), primitive[0]),
              " ",
            ),
          );
        }
        break;
      case "Line":
        let pl = makeLinePoint(primitive[0]);
        out.push(`<polyline point="${pl}" fill="none" />`);

        break;
      case "Polygon":
        let pp = makeLinePoint(primitive[0]);
        out.push(`<polygon point="${pp}" />`);
        break;
      case "Rectangle":
        // TODO ROUNDED RECTANGLE
        let xmin,
          ymin = primitive[0];
        let xmax, ymax;
        if (primitive.length == 1) {
          xmax = xmin + 1;
          ymax = ymin + 1;
        } else {
          xmax = primitive[1][0];
          ymax = primitive[1][1];
        }
        let width = xmax - xmin;
        let height = ymax - ymin;

        out.push(
          `<rectangle x="${xmin}" y="${ymin}" width="${width}" height="${height}"/>`,
        );
        break;
      case "Circle":
        let cx = 0,
          cy = 0,
          rx = 1,
          ry = 1;
        if (primitive.length > 0) {
          cx, (cy = primitive[0]);
        }
        if (primitive.length > 1) {
          if (Array.isArray(primitive[1])) {
            rx, (ry = primitive[1]);
          } else {
            rx = primitive[1];
            ry = rx;
          }
        }
        if (rx == ry) {
          out.push(`<circle cx="${cx}" cy="${cy}" r="${rx}"/>`);
        } else {
          out.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`);
        }
        break;
    }
  }
  return out.join("");
});
