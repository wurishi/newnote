// export function maxProfit(prices: number[]): number {
//   const n = prices.length;
//   const max_k = 2;
//   const dp: number[][][] = [];
//   for (let i = 0; i < n; i++) {
//     if (!dp[i]) {
//       dp[i] = [];
//     }
//     for (let k = max_k; k >= 1; k--) {
//       if (!dp[i][k]) {
//         dp[i][k] = [];
//       }
//       if (i - 1 == -1) {
//         dp[i][k][0] = 0;
//         dp[i][k][1] = -prices[i];
//       }
//       dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
//       dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);
//     }
//   }
//   return dp[n - 1][max_k][0];
// }

/**
 * 123. 买卖股票的最佳时机 III
 * 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
 * 注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * @param prices
 */
export function maxProfit(prices: number[]): number {
  let dp_i10 = 0,
    dp_i11 = Number.MIN_SAFE_INTEGER;
  let dp_i20 = 0,
    dp_i21 = Number.MIN_SAFE_INTEGER;
  prices.forEach((price) => {
    dp_i20 = Math.max(dp_i20, dp_i21 + price);
    dp_i21 = Math.max(dp_i21, dp_i10 - price);
    dp_i10 = Math.max(dp_i10, dp_i11 + price);
    dp_i11 = Math.max(dp_i11, -price);
  });
  return dp_i20;
}
