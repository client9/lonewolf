export default function NoneTrue(list, fn) {
  return list.findIndex(fn) === -1;
  // slow way
  // list.find(fn) === undefined
  // return (list.every(x => !fn(x)))
}
