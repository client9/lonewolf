import Head from "./Head.js";

export function MatchOnePredicate(fn) {
  return function (args, i) {
    if (fn(args[i])) {
      return i + 1;
    }
    return -1;
  };
}

export function MatchType(val) {
  const tval = typeof val;
  return MatchOnePredicate((x) => typeof x === tval);
}

export function MatchHead(val) {
  let head = Head(val);
  //return MatchOnePredicate((x) => ((typeof head) === (typeof val)));
  return MatchOnePredicate((x) => head == Head(x));
}

export function MatchValue(val) {
  return MatchOnePredicate((x) => x === val);
}

// TBD... what if i != 0
export function MatchNone(args, i) {
  if (args.length == 0) {
    return 0;
  }
  return -1;
}

export function MatchOne(val) {
  let f = function (args, i) {
    if (args[i] == val) {
      return i + 1;
    }
    return -1;
  };
  let desc = val.toString();
  f.toString = function () {
    return desc;
  };
  return f;
}

export function MatchOneAny(args, i) {
  return i + 1;
}

MatchOneAny.toString = function () {
  return "*";
};

export function MatchAnd(...matchers) {
  let f = function (args, j) {
    let i = 0;
    while (i < matchers.length) {
      if (j == args.length) {
        return -1;
      }
      let idx = matchers[i](args, j);
      if (idx == -1) {
        return -1;
      }

      // advance matchers
      if (idx > j) {
        i++;
        j = idx;
      }
    }
    return j;
  };
  let desc = matchers.map((x) => x.toString()).join(",");

  f.toString = function () {
    return desc;
  };
  return f;
}

// Repeated can't use patterns and needs to manually dispatched
// Defalt is one or more times
export function Repeated(m, n) {
  let pmin = 1;
  let pmax = Infinity;

  if (typeof n === "undefined") {
    // NOP
  } else if (typeof n === "number") {
    pmax = n;
  } else if (Array.isArray(n)) {
    if (n.length === 1 && typeof n[0] === "number") {
      pmin = n[0];
      pmax = n[0];
    } else if (n.length === 2) {
      pmin = n[0];
      pmax = n[1];
    }
  } else {
    throw new Error("invalid inputs to Repeated");
  }

  return function (args, j) {
    let jnext = j;
    let jcur = j;
    let count = 0;
    while (jcur < args.length) {
      jnext = m(args, jnext);
      if (jnext == -1) {
        break;
      }
      jcur = jnext;
      count++;
    }
    if (pmin <= count && count <= pmax) {
      return jcur;
    }
    return -1;
  };
}

export function MatchOr(matchers) {
  let f = function (arg, j) {
    let i = 0;
    while (i < matchers.length) {
      if (j == args.length) {
        return -1;
      }
      let idx = matchers[i](args, j);
      if (idx == -1) {
        i++;
        continue;
      }
      if (idx > j) {
        return idx;
      }
    }
    // can't happen?
    return -1;
  };
  let desc = matchers.map((x) => x.toString()).join("|");
  f.toString = function () {
    return desc;
  };
  return f;
}
export function Pattern(m, args) {
  return m(args, 0) == args.length;
}

function P1ttern(matchers, args) {
  let i = 0;
  let j = 0;
  while (i < matchers.length && j < args.length) {
    let idx = matchers[i](args, j);
    if (idx == -1) {
      break;
    }
    if (idx > j) {
      j = idx;
      i++;
    }
  }
  return i == matchers.length && j == args.length;
}
