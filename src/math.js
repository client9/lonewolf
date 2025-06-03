import * as _expr from "./expr.js";
Object.assign(globalThis, _expr);

function Plus(...args) {
  return Call(Plus, ...Eval(args));
}
Define(Plus, "Number*", function (...args) {
  let sum = 0;
  for (const a of args) {
    sum += a;
  }
  return sum;
});
