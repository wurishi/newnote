/**
 * 46. 全排列
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 * @param nums
 */
export function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  function backtrack(nums: number[], track: number[]) {
    if (track.length == nums.length) {
      res.push(track.concat());
      return;
    }
    const len = nums.length;
    for (let i = 0; i < len; i++) {
      if (track.indexOf(nums[i]) >= 0) {
        continue;
      }
      track.push(nums[i]);
      backtrack(nums, track);
      track.pop();
    }
  }
  const track: number[] = [];
  backtrack(nums, track);
  return res;
}
