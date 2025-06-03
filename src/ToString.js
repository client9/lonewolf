export default function ToString(arg) {
  if (typeof arg === "string") {
    return arg;
  }
  // works for most types.. object TBD
  return JSON.stringify(arg);
}
