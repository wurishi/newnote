export function maxProfit(prices: number[]): number {
  const n = prices.length;
  const max_k = 2;
  const dp: number[][][] = [];
  for (let i = 0; i < n; i++) {
    if (!dp[i]) {
      dp[i] = [];
    }
    for (let k = max_k; k >= 1; k--) {
      if (!dp[i][k]) {
        dp[i][k] = [];
      }
      if (i - 1 == -1) {
        dp[i][k][0] = 0;
        dp[i][k][1] = -prices[i];
      }
      // dp[i][k][0] =
    }
  }
}
