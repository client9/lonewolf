export default function Do(fn, spec) {
  if (Number.isSafeInteger(spec)) {
    for (let i = 0; i < spec; i++) {
      fn();
    }
  }
}
