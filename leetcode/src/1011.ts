/**
 * 1011. 在 D 天内送达包裹的能力
 * 传送带上的包裹必须在 D 天内从一个港口运送到另一个港口。
 * 传送带上的第 i 个包裹的重量为 weights[i]。每一天，我们都会按给出重量的顺序往传送带上装载包裹。我们装载的重量不会超过船的最大运载重量。
 * 返回能在 D 天内将传送带上的所有包裹送达的船的最低运载能力。
 * @param weights
 * @param D
 */
export function shipWithinDays(weights: number[], D: number): number {
  function canFinish(w: number[], D: number, cap: number): boolean {
    let i = 0;
    for (let day = 0; day < D; day++) {
      let maxCap = cap;
      while ((maxCap -= w[i]) >= 0) {
        i++;
        if (i == w.length) {
          return true;
        }
      }
    }
    return false;
  }
  let left = Math.max(...weights);
  let right = weights.reduce((p, c) => p + c, 1);
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (canFinish(weights, D, mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}
