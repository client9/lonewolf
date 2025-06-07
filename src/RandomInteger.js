import { Eval, Call, Define } from "./dispatch.js";
import { MatchNone, MatchHead } from "./pattern.js";

export default function RandomInteger(...args) {
  return Call(RandomInteger, ...Eval(args));
}

Define(RandomInteger, MatchNone, () => Math.round(Math.random()));

Define(RandomInteger, MatchHead(Number), (n) => Math.floor(Math.random() * n));
