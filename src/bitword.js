import { Eval, Call, Define } from "./dispatch.js";
import Expr from "./Expr.js";
import Clamp from "./Clamp.js";

export default function Uint64(...args) {
  return Call(BitWord64, ...Eval(args));
}

const wordMax = BitInt("0xFFFFFFFF");
const words = Table( x => BitInt(x); {64});

Define(BitWord64, "Number", function(val) {
  return new Expr(BitWord64);
})

Define(Plus, "BitWord64 BitWord64", function (a, b) {
  return new Expr(BitWord64, (a[0] + b[0]) x& wordMax)
});
Define(Xor, "BitWord64 BitWord64", function (a, b) {
  return new Expr(BitWord64, (a[0] ^ b[0]) & wordMax)
});
Define(ShiftRight, "BitWord64 Number", function (a, b) {
  return new Expr(BitWord64, BitInt.UintN(64, (a[0] >> words[b]))
});
r
