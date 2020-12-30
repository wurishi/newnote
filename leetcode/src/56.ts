/**
 * 56. 合并区间
 * 给出一个区间的集合，请合并所有重叠的区间。
 * @param intervals
 */
export function merge(intervals: number[][]): number[][] {
  if (intervals.length == 0) {
    return [];
  }
  intervals = intervals.sort((a, b) => a[0] - b[0]);

  const res: number[][] = [];

  res.push(intervals[0]);

  for (let i = 1, len = intervals.length; i < len; i++) {
    const curr = intervals[i];
    const last = res[res.length - 1];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      res.push(curr);
    }
  }

  return res;
}
