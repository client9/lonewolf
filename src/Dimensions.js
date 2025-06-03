import MapList from "./MapList.js";
import ListQ from "./ListQ.js";
import Equal from "./Equal.js";

export default function Dimensions(a, n = 999, out = []) {
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
