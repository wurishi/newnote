/**
 * 198. 打家劫舍
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 * @param nums 
 */
export function rob(nums: number[]): number {
  const n = nums.length;
  let dp_i_1 = 0,
    dp_i_2 = 0;
  let dp_i = 0;
  for (let i = n - 1; i >= 0; i--) {
    dp_i = Math.max(dp_i_1, nums[i] + dp_i_2);
    dp_i_2 = dp_i_1;
    dp_i_1 = dp_i;
  }
  return dp_i;
}
