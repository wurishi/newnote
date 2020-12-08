/**
 * 188. 买卖股票的最佳时机 IV
 * 给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * @param k
 * @param prices
 */
export function maxProfit(k: number, prices: number[]): number {
  const n = prices.length;
  if (k > n / 2) {
    k = Math.floor(n / 2);
  }
  let profit = new Array(k);
  for (let j = 0; j <= k; j++) {
    profit[j] = [-prices[0], 0];
  }
  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      profit[j][0] = Math.max(profit[j][0], profit[j - 1][1] - prices[i]);
      profit[j][1] = Math.max(profit[j][1], profit[j][0] + prices[i]);
    }
  }
  return profit[k][1];
}
