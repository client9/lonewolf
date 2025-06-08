// Returns true if no member is List (i.e. JS Array), false otherwise

export default function VectorQ(arg) {
  return Array.isArray(arg) && arg.findIndex(Array.isArray) === -1;
}
