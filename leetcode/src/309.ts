/**
 * 309. 最佳买卖股票时机含冷冻期
 * 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​
 * 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
 * (1) 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * (2) 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
 * @param prices 
 */
export function maxProfit(prices: number[]): number {
  const n = prices.length;
  let dp_i_0 = 0,
    dp_i_1 = Number.MIN_SAFE_INTEGER;
  let dp_pre_0 = 0;

  for (let i = 0; i < n; i++) {
    let temp = dp_i_0;
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]);
    dp_pre_0 = temp;
  }
  return dp_i_0;
}
