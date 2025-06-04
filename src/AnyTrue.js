export default function AnyTrue(list, fn) {
  return list.some(fn);
  //return list.findIndex(fn) !== -1;
}
