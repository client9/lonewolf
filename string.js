import * as _expr from "./expr.js";
import * as _list from "./list.js";
import * as _func from "./functional.js";
Object.assign(globalThis, _expr);
Object.assign(globalThis, _list);
Object.assign(globalThis, _func);


export function ToString(arg) {
    if (typeof arg === "string") {
        return arg
    }
    // works for most types.. object TBD
    return JSON.stringify(arg)
}

export function StringPadLeft(str, n, pad = " ") {
  // easy optimization here
  // str.length  + x * padding.length = n
  // x* pad.len = n - str.len
  const x = Math.ceil((n - str.length) / pad.length);
  if (x > 0) {
    str = new Array(x).fill(pad).join("") + str;
  }
  if (str.length > n) {
    return str.slice(0, n);
  }
  return str;
}

//  In other languages string join joins strings with a separator
//  That's handled by StringRiffle
//  This flattens and joins directly.
export function StringJoin(...args) {
  return args.flat(999).join("");
}

// TBD missing last arg of max length
function StringRepeat(str, n) {
    return str.repeat(n)
}

function stringRiffleLevel(n, list, seps) {
    let current, next;
    let [sepLeft, sepMid, sepRight] = [ "", " ", "" ]
    if (n < seps.length) {
        current= seps[n]
        if (ListQ(current)) {
            [ sepLeft, sepMid, sepRight ] = current
        } else {
            sepMid = current
        }
    } 
    if (AllTrue(list, ListQ)) {
        return sepLeft + MapList(str => stringRiffleLevel(n+1, str, seps), list).join(sepMid) +  sepRight
    }
    return sepLeft + MapList(x => ToString(x), list).join(sepMid) + sepRight
}

export function StringRiffle(list, ...seps) {
    if (seps.length == 0) {
        seps = MapList( x => StringRepeat("\n", x), Range(ArrayDepth(list)))
        seps[0] = " "
        seps = Reverse(seps)
    }
    return stringRiffleLevel(0, list, seps)
}

