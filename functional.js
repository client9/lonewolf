export function Apply(fn, list) {
  if (typeof fn == "string") {
    list.name = fn;
    return list;
  }
  return fn(...list);
}

export function Map(fn, args) {
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
export function MapIndexed(fn, data, level) {
  // fast case.. there is another when level is =[1]
  if (!level || level === 1) {
    return mapindexed_level1(fn, data);
  }

  const out = Array(data.length);
  for (let i = 0; i < out.length; i++) {
    out[i] = fn(data[i], i);
  }
  return out;
}
