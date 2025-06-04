export default function Transpose(matrix) {
  let out = [];
  let cols = matrix[0].length;
  let rows = matrix.length;
  for (let j = 0; j < cols; j++) {
    let row = [];
    for (let i = 0; i < rows; i++) {
      row.push(matrix[i][j]);
    }
    out.push(row);
  }
  return out;
}
