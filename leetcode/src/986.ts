/**
 * 986. 区间列表的交集
 * 给定两个由一些 闭区间 组成的列表，每个区间列表都是成对不相交的，并且已经排序。
 * 返回这两个区间列表的交集。
 * （形式上，闭区间 [a, b]（其中 a <= b）表示实数 x 的集合，而 a <= x <= b。两个闭区间的交集是一组实数，要么为空集，要么为闭区间。例如，[1, 3] 和 [2, 4] 的交集为 [2, 3]。）
 * @param A
 * @param B
 */
export function intervalIntersection(A: number[][], B: number[][]): number[][] {
  let i = 0,
    j = 0;

  const res: number[][] = [];

  const lenA = A.length;
  const lenB = B.length;
  while (i < lenA && j < lenB) {
    const [a1, a2] = A[i];
    const [b1, b2] = B[j];

    if (b2 >= a1 && a2 >= b1) {
      res.push([Math.max(a1, b1), Math.min(a2, b2)]);
    }
    if (b2 < a2) {
      j++;
    } else {
      i++;
    }
  }

  return res;
}
