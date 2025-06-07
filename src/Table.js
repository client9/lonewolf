import Most from "./Most.js";
import Last from "./Last.js";
import Rest from "./Rest.js";
import First from "./First.js";

export default function Table(fn, ...specs) {
  /*
  if (specs.length > 1) {
	return Table(() => Table(fn, ...Most(specs)), Last(specs))
  }
*/
  let spec = First(specs);
  let rest = Rest(specs);
  if (Number.isSafeInteger(spec)) {
    let ary = new Array(spec);
    if (typeof fn == "function") {
      for (let i = 0; i < spec; i++) {
        if (rest.length == 0) {
          ary[i] = fn();
        } else {
          ary[i] = Table(fn, ...rest);
        }
      }
    } else {
      ary.fill(fn);
    }
    return ary;
  }
  let imin, imax, inc;
  if (Array.isArray(spec)) {
    if (spec.length == 1) {
      [imin, imax, inc] = [0, spec[0], 1];
    } else if (spec.length == 2) {
      [imin, imax, inc] = [spec[0], spec[1], 1];
    } else if (spec.length == 3) {
      [imin, imax, inc] = spec;
    } else {
      throw new Error("Unknown Table spec of " + spec);
    }
  } else {
    throw new Error("Unknown Table spec of " + spec);
  }
  let ary = new Array(Math.floor((imax - imin) / inc));
  //console.log(">>>>", typeof fn)
  //console.log(fn instanceof Function)
  if (typeof fn == "function") {
    // || (fn instanceof Function)) {
    for (let i = imin, j = 0; i < imax; i += inc, j++) {
      if (specs.length == 1) {
        ary[j] = fn(i);
      } else {
        let fnext = function (...args) {
          return fn(i, ...args);
        };
        ary[j] = Table(fnext, ...rest);
      }
    }
  } else {
    ary.fill(fn);
  }
  return ary;
}

/*
> f = function(x,y) { return [x,y] }
[Function: f]
> fnext = function(...args) { return f(1, ...args) }
[Function: fnext]
> fnext(2)
[ 1, 2 ]
> 
*/
