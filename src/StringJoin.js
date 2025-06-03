//  In other languages string join joins strings with a separator
//  That's handled by StringRiffle
//  This flattens and joins directly.
export default function StringJoin(...args) {
  return args.flat(999).join("");
}
