export default function Partition(arr, n) {
  if (n <= 0) {
    return null;
  }
  let out = [];
  for (let i = 0, len = arr.length; i < len; i += n) {
    out.push(arr.slice(i, i + n));
  }
  return out;
}
