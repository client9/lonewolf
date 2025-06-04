import Head from "./Head.js";
import Expr from "./Expr.js";

/**
 * For basic JS types, this will do nothing, and just return the input
 * For arrays, it will create a new array Eval-ing each element
 * For Exprs it will evaluate the expressions.
 *
 * @param {*}
 * @returns {*}
 */
export function Eval(arg) {
  if (arg instanceof Expr) {
    return arg.head(...arg);
  }
  if (Array.isArray(arg)) {
    return arg.map((x) => Eval(x));
  }
  return arg;
}

//----------------------
function capture(args, idx, pname) {
  for (let i = idx; i < args.length; i++) {
    let name = Head(args[i]);
    if (name != pname) {
      return i;
    }
  }
  return args.length;
}
function matchCompile(str) {
  return str.split(" ");
}
function match(pattern, args) {
  // must have no arguments
  if (args.length == 0 && pattern.length == 0) {
    return true;
  }
  let j = 0;
  let i = 0;
  while (i < args.length && j < pattern.length) {
    let p = pattern[j];
    // zero or more
    if (p.endsWith("*")) {
      p = p.slice(0, p.length - 1);
      let k = capture(args, i, p);
      i = k;
      j++;
      continue;
    }

    // one or more
    if (p.endsWith("+")) {
      p = p.slice(0, p.length - 1);
      let k = capture(args, i, p);

      //didn't capture anything
      if (k == i) {
        return false;
      }
      i = k;
      j++;
      continue;
    }

    // exactly zero or one
    if (p.endsWith("?")) {
      p = p.slice(0, p.length - 1);
      let k = capture(args, i, p);

      // got more than 1
      if (k > i + 1) {
        return false;
      }
      i = k;
      j++;
      continue;
    }

    // exactly one
    let name = Head(args[i]);
    if (name != p) {
      return false;
    }
    // matched.  Advace the arg and pattern
    i++;
    j++;
  }

  // matching ran out on one side or the other.
  if (j != pattern.length || i != args.length) {
    return false;
  }

  return true;
}

var registry = new Map();

export function Define(sym, pattern, fn) {
  let patterns = registry.get(sym);
  if (!patterns) {
    patterns = [];
  }
  patterns.push([pattern, matchCompile(pattern), fn]);
  registry.set(sym, patterns);
}

export function Call(sym, ...args) {
  let patterns = registry.get(sym);
  if (!patterns) {
    throw new Error(sym.name + ":  no definitions found");
    //return new Expr(sym, ...args)
  }
  let f = patterns.find((x) => match(x[1], args));
  if (!f) {
    // this is the calling signature
    const sig = args.map((x) => Head(x)).join(" ");
    throw new Error(sym.name + ": no matching for signature of (" + sig + ")");
    //return new Expr(sym, ...args)
  }
  return f[2](...args);
}
