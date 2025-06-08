import { Eval, Call, Define } from "./dispatch.js";
import { Repeated, MatchType } from "./pattern.js";

export default function BitXor(...args) {
  return Call(BitXor, ...Eval(args));
}

// TODO, check for integer
Define(BitXor, Repeated(MatchType(1)), function (...args) {
  return args.reduce((x, y) => x ^ y, 0);
});
Define(BitXor, MatchType([]), function (list) {
  return list.reduce((x, y) => x ^ y, 0);
});
