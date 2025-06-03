import MapList from "./MapList.js";
import StringPadLeft from "./StringPadLeft.js";
//import Table from "./Table.js";
import StringJoin from "./StringJoin.js";
import { HTMLTag } from "./html.js";
import { CSSColor } from "./color.js";

export function Legend(n, colorfn) {
  const nbsp = String.fromCodePoint(0xa0);
  return StringJoin(
    "<table style='border-collapse:collapse'>\n",
    "<thead></thead>\n",
    "<tbody>\n",
    "<tr>\n",
    MapList(
      (i) =>
        HTMLTag(
          "td",
          {},
          StringPadLeft(Math.round((100.0 * i) / n).toString(), 4, nbsp),
        ),
      Range(n),
    ),
    "</tr>\n",
    "<tr>\n",
    MapList(
      (i) =>
        HTMLTag(
          "td",
          { style: "background:" + CSSColor(colorfn(i / n)) },
          nbsp,
        ),
      Range(n),
    ),
    "</tr>\n",
    "</table>\n",
  );
}
export function ArrayPlot(m, ...options) {
  const defaultOptions = {
    colorFunctionScaling: true,
    colorFunction: VisibleSpectrum,
  };
  const opts = { ...defaultOptions, ...options };

  return StringJoin(
    "<table class='ldp'>",
    "<thead></thead>\n",
    "<tbody>",
    MapList(
      (row) => [
        "<tr>",
        MapList(
          (cell) =>
            HTMLTag(
              "td",
              {
                class: "cell",
                style: "background:" + CSSColor(opts.colorFunction(cell)),
              },
              "&nbsp;",
            ),
          row,
        ),
        "</tr>",
      ],
      m,
    ),
    "</tbody>",
    "</table>",
  );
}

/*
HTMLNode("table", {}, [ 
    HTMLNode("thead"),
    HTMLNode("tbody", {}, MapList( row => ( HTMLTag("tr", {}, MapList( cell => HTMLTag("td", {
       class: "cell",
       style: "background:" + CSSColor(opts.colorFunction(cell)),
     }, [ HTMLTextNode("&nbsp;") ]), row))), m))])

*/
