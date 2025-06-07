export default function Mean(...args) {
  let ary = args;
  if (args.length === 1 && Array.isArray(args[0])) {
    ary = args[0];
  }
  if (ary.length === 0) {
    return 0;
  }
  return ary.reduce((x, y) => x + y, 0) / ary.length;
}
