/**
 * 213. 打家劫舍 II
 * 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，能够偷窃到的最高金额。
 *
 * @param nums
 */
export function rob(nums: number[]): number {
  const n = nums.length;
  if (n == 1) return nums[0];
  return Math.max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
}

function robRange(nums: number[], start: number, end: number): number {
  const n = nums.length;
  let dp_i_1 = 0,
    dp_i_2 = 0;
  let dp_i = 0;
  for (let i = end; i >= start; i--) {
    dp_i = Math.max(dp_i_1, nums[i] + dp_i_2);
    dp_i_2 = dp_i_1;
    dp_i_1 = dp_i;
  }
  return dp_i;
}
