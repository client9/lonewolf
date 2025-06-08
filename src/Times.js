import { Eval, Call, Define } from "./dispatch.js";
import { Repeated, MatchType } from "./pattern.js";

export default function Times(...args) {
  return Call(Times, ...Eval(args));
}

// standard addition of numbers
Define(Times, Repeated(MatchType(1)), function (...args) {
  return args.reduce((x, y) => x * y, 1);
});
// standard addition of numbers
Define(Times, MatchType([]), function (list) {
  return list.reduce((x, y) => x * y, 1);
});
