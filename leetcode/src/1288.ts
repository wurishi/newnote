/**
 * 1288. 删除被覆盖区间
 * 给你一个区间列表，请你删除列表中被其他区间所覆盖的区间。
 * 只有当 c <= a 且 b <= d 时，我们才认为区间 [a,b) 被区间 [c,d) 覆盖。
 * 在完成所有删除操作后，请你返回列表中剩余区间的数目。
 * @param intervals
 */

export function removeCoveredIntervals(intervals: number[][]): number {
  intervals = intervals.sort((a, b) => {
    // 按起点升序排列, 起点相同时降序排列
    if (a[0] == b[0]) {
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });

  let [left, right] = intervals[0];
  let res = 0;
  for (let i = 1, len = intervals.length; i < len; i++) {
    const intv = intervals[i];
    // 情况一, 找到覆盖区间
    if (left <= intv[0] && right >= intv[1]) {
      res++;
    }
    // 情况二, 找到相交区间, 合并
    if (right >= intv[0] && right <= intv[1]) {
      right = intv[1];
    }
    // 情况三, 完全不相交, 更新起点和终点
    if (right < intv[0]) {
      [left, right] = intv;
    }
  }

  return intervals.length - res;
}
