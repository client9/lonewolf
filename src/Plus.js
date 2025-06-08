import { Eval, Call, Define } from "./dispatch.js";
import { Repeated, MatchType } from "./pattern.js";

export default function Plus(...args) {
  return Call(Plus, ...Eval(args));
}

// standard addition of numbers
Define(Plus, Repeated(MatchType(1)), function (...args) {
  return args.reduce((x, y) => x + y, 0);
});
// standard addition of numbers
Define(Plus, MatchType([]), function (list) {
  return list.reduce((x, y) => x + y, 0);
});
