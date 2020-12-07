/**
 * 121. 买卖股票的最佳时机
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。
 * 注意：你不能在买入股票前卖出股票。
 * @param prices
 */
export function maxProfit(prices: number[]): number {
  const n = prices.length;
  const dp: number[][] = [];
  for (let i = 0; i < n; i++) {
    if (!dp[i]) {
      dp[i] = [];
    }
    if (i - 1 == -1) {
      dp[i][0] = 0;
      dp[i][1] = -prices[i];
      continue;
    }
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
  }
  return dp[n - 1] ? dp[n - 1][0] : 0;
}

// 空间复杂度 O(1)
export function maxProfit_k_1(prices: number[]): number {
  const n = prices.length;
  let dp_i_0 = 0,
    dp_i_1 = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < n; i++) {
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, -prices[i]);
  }
  return dp_i_0;
}
