import AllTrue from "./AllTrue.js";
import ListQ from "./ListQ.js";
import MapList from "./MapList.js";
import Range from "./Range.js";
import ArrayDepth from "./ArrayDepth.js";
import StringRepeat from "./StringRepeat.js";
import Reverse from "./Reverse.js";
import ToString from "./ToString.js";

function stringRiffleLevel(n, list, seps) {
  let current;
  let [sepLeft, sepMid, sepRight] = ["", " ", ""];
  // maybe
  // if n == seps.length { return toString(list) }
  // we ran out of separators

  if (n < seps.length) {
    current = seps[n];
    if (ListQ(current)) {
      [sepLeft, sepMid, sepRight] = current;
    } else {
      sepMid = current;
    }
  }
  // is list of list AND we n+1 < seps.length
  if (AllTrue(list, ListQ)) {
    return (
      sepLeft +
      MapList((str) => stringRiffleLevel(n + 1, str, seps), list).join(sepMid) +
      sepRight
    );
  }
  return sepLeft + MapList((x) => ToString(x), list).join(sepMid) + sepRight;
}

export default function StringRiffle(list, ...seps) {
  if (seps.length == 0) {
    // this next list can be optimized
    seps = MapList((x) => StringRepeat("\n", x), Range(ArrayDepth(list)));
    seps[0] = " ";
    seps = Reverse(seps);
  }
  return stringRiffleLevel(0, list, seps);
}
