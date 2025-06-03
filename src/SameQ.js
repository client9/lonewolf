export default function SameQ(...args) {
  if (args.length < 2) {
    return true;
  }
  let a = args[0];
  let b = args[1];

  // basic types
  if (a === b) {
    return true;
  }

  if (a === null || b === null) {
    return false;
  }

  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  // array version
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length != b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!SameQ(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  // objects
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (let key of keysA) {
    if (!b.hasOwnProperty(key) || !SameQ(a[key], b[key])) return false;
  }

  return true;
}
