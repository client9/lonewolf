import { Eval, Call, Define } from "./dispatch.js";
import { Repeated, MatchType } from "./pattern.js";

export default function BitOr(...args) {
  return Call(BitOr, ...Eval(args));
}

// TODO, check for integer
Define(BitOr, Repeated(MatchType(1)), function (...args) {
  return args.reduce((x, y) => x | y, 0);
});
Define(BitOr, MatchType([]), function (list) {
  return list.reduce((x, y) => x | y, 0);
});
