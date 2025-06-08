import Transpose from "./Transpose.js";
import MapList from "./MapList.js";
import Apply from "./Apply.js";

export default function MapThread(fn, lists) {
  return MapList((x) => Apply(fn, x), Transpose(lists));
}
