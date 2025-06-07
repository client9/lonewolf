export default function Timing(fn) {
  const timeStart = Date.now();
  fn();
  const timeEnd = Date.now();
  return timeEnd - timeStart;
}
