/**
 * 875. 爱吃香蕉的珂珂
 * 珂珂喜欢吃香蕉。这里有 N 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 H 小时后回来。
 * 珂珂可以决定她吃香蕉的速度 K （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 K 根。如果这堆香蕉少于 K 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。
 * 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。
 * 返回她可以在 H 小时内吃掉所有香蕉的最小速度 K（K 为整数）。
 * @param piles
 * @param H
 */
export function minEatingSpeed(piles: number[], H: number): number {
  function getMax(piles: number[]): number {
    let max = 0;
    piles.forEach((n) => (max = Math.max(n, max)));
    return max;
  }

  function canFinish(piles: number[], speed: number, H: number): boolean {
    let time = 0;
    piles.forEach((n) => (time += timeOf(n, speed)));
    return time <= H;
  }

  function timeOf(n: number, speed: number): number {
    return Math.floor(n / speed + (n % speed > 0 ? 1 : 0));
  }

  let left = 1,
    right = getMax(piles) + 1;
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (canFinish(piles, mid, H)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}
