import * as _expr from "./expr.js";
import * as _list from "./list.js";

Object.assign(globalThis, _expr);
Object.assign(globalThis, _list);

// Fundamental
//
export function Apply(fn, list) {
  return fn(...list);
}

export function MapList(fn, args) {
  return args.map(fn);
}

export function MapThread(fn, ...lists) {
  return Map((x) => Apply(fn, x), Transpose(lists));
}

function mapindexed_level1(fn, data) {
  const out = Array(data.length);
  for (let i = 0; i < out.length; i++) {
    out[i] = fn(data[i], [i]);
  }
  return out;
}
export function MapIndexed(fn, data, level = [1]) {
  // fast case.. there is another when level is =[1]
  if (!level || level === 1) {
    return mapindexed_level1(fn, data);
  }

  const out = new Array(data.length);
  for (let i = 0; i < out.length; i++) {
    out[i] = fn(data[i], i);
  }
  return out;
}

export function AllTrue(list, fn) {
  return list.every(fn);
}
export function AnyTrue(list, fn) {
  return list.some(fn)
  //return list.findIndex(fn) !== -1;
}
export function NoneTrue(list, fn) {
  return list.findIndex(fn) === -1;
  // slow way
  // return (list.every(x => !fn(x)))
}
