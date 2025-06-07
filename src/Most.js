export default function Most(x) {
  if (x.length == 0) {
    return x;
  }
  return x.slice(0, x.length - 1);
}
