export default function Equal(...args) {
  if (args.length < 2) {
    return true;
  }
  let first = args[0];
  return args.every(function (x) {
    return x === first;
  });
}
