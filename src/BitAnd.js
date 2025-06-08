import { Eval, Call, Define } from "./dispatch.js";
import { Repeated, MatchType } from "./pattern.js";

export default function BitAnd(...args) {
  return Call(BitAnd, ...Eval(args));
}

// TODO, check for integer
Define(BitAnd, Repeated(MatchType(1)), function (...args) {
  return args.reduce((x, y) => x & y, 0);
});
Define(BitAnd, MatchType([]), function (list) {
  return list.reduce((x, y) => x & y, 0);
});
