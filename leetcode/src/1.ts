/**
 * 1. 两数之和
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
 * @param nums
 * @param target
 */
export default function twoSum(nums: number[], target: number): number[] {
  const res: number[] = [];
  const map = new Map<number, number>(); // 使用 map 使的后续查找时间为 O(1)
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const v = nums[i];
    const tmp = target - v;
    if (map.has(tmp)) {
      return [map.get(tmp) as number, i];
    }
    map.set(v, i);
  }
  return res;
}
