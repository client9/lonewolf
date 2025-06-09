// Dot product for matrix and vectors
import { Eval, Call, Define } from "./dispatch.js";
import { MatchOne } from "./pattern.js";
import VectorQ from "./VectorQ.js";
import MatrixQ from "./MatrixQ.js";
import MapThread from "./MapThread.js";
import Apply from "./Apply.js";
import Times from "./Times.js";
import Plus from "./Plus.js";

export default function Dot(...args) {
  return Call(Dot, ...Eval(args));
}

// dotvec is an unchecked dot product of two vectors
const dotvecvec = function (a, b) {
  let sum = 0.0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
};

const dotmatvec = function (a, b) {
  let out = new Array(b.length);
  for (let i = 0; i < a.length; i++) {
    out[i] = dotvecvec(a[i], b);
  }
  return out;
};

Define(Dot, [MatchOne(VectorQ), MatchOne(VectorQ)], function (a, b) {
  if (a.length != b.length) {
    throw new Error("dot product requires vector have same length");
  }
  return dotvecvec(a, b);
  //return Apply(Plus, MapThread(Times, [a, b]))
});

Define(Dot, [MatchOne(MatrixQ), MatchOne(VectorQ)], function (a, b) {
  if (a[0].length != b.length) {
    throw new Error("wrong shape");
  }
  return dotmatvec(a, b);
});

Define(Dot, [MatchOne(MatrixQ), MatchOne(MatrixQ)], function (a, b) {
  let n = Transpose(b);
  if (a.length != n.length) {
    throw new Error("matrix wrong shape");
  }
  return Map((v) => dotmatvec(a, v), n);
});
