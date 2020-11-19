/**
 * 283. 移动零
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * @param nums 
 */
export function moveZeroes(nums: number[]): void {
  let fast = 0,
    slow = 0;
  const len = nums.length;
  while (fast < len) {
    if (nums[fast] != 0) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }
  for (let i = slow; i < len; i++) {
    nums[i] = 0;
  }
}
