export default function MapIndexed(fn, data, level = [1]) {
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

function mapindexed_level1(fn, data) {
  const out = new Array(data.length);
  for (let i = 0; i < out.length; i++) {
    out[i] = fn(data[i], [i]);
  }
  return out;
}
