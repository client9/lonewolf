export class Expr extends Array {
  constructor(name, ...args) {
    super(...args);

    // this additional property does not show up
    // on normal array iteration, or change the length
    // for example:
    //     Expr(foo, 1,2,3)
    // has length 3, and works the same as [1,2,3]
    this.head = name;
  }

  // Output should  x == eval(x.toString())
  toString() {
    if (this.length == 0) {
      return "";
    }
    return (
      this.head.name + "(" + this.map((x) => x.toString()).join(", ") + ")"
    );
  }
}

/**
 * Returns the "head" of an input.
 * It's an Expr-aware super "typeof" function.
 * Always returns a string, never fails.
 *
 * @param {*}
 * @returns {string}
 */
export function Head(x) {
  if (typeof x === "undefined") {
    return "undefined";
  }

  // TBD: object might be better
  if (x === null) {
    return "null";
  }
  if (x instanceof Expr) {
    return x.head.name || x.head.constructor.name;
  }
  return x.constructor.name;
}

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

export function ListQ(arg) {
  return Array.isArray(arg);
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

export function Equal(...args) {
  if (args.length < 2) {
    return true;
  }
  let first = args[0];
  return args.every(function (x) {
    return x === first;
  });
}

export function SameQ(...args) {
  if (args.length < 2) {
    return true;
  }
  let a = args[0];
  let b = args[1];

  // basic types
  if (a === b) {
    return true;
  }

  if (a === null || b === null) {
    return false;
  }

  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  // array version
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length != b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!SameQ(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  // objects
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (let key of keysA) {
    if (!b.hasOwnProperty(key) || !SameQ(a[key], b[key])) return false;
  }

  return true;
}
