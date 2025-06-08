// Returns true if no member is List (i.e. JS Array), false otherwise
import VectorQ from "./VectorQ.js";

export default function MatrixQ(arg) {
  return Array.isArray(arg) && arg.every(VectorQ);
}
