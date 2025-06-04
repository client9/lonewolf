export default function NoneTrue(list, fn) {
  return list.findIndex(fn) === -1;
  // slow way
  // return (list.every(x => !fn(x)))
}
