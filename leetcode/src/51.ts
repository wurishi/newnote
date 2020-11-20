/**
 * 51. N 皇后
 * n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 * 皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。
 * @param n
 */
export function solveNQueens(n: number): string[][] {
  const res: string[][] = [];
  function backtrack(temp: number[], res: string[][]) {
    // 触发结束条件
    if (temp.length === n) {
      return res.push(convert(n, temp));
    }
    for (let col = 0; col < n; col++) {
      if (isValid(temp, col)) {
        temp.push(col);
        backtrack(temp, res);
        temp.pop();
      }
    }
  }
  backtrack([], res);
  return res;
}

function convert(n: number, queens: number[]): string[] {
  return queens.map(
    (queen) => '.'.repeat(queen) + 'Q' + '.'.repeat(n - queen - 1)
  );
}

function isValid(temp: number[], currCol: number): boolean {
  const currRow = temp.length;
  for (let row = 0; row < temp.length; row++) {
    const col = temp[row];
    if (
      currCol === col ||
      currCol + currRow === col + row ||
      currCol - currRow === col - row
    )
      return false;
  }
  return true;
}
