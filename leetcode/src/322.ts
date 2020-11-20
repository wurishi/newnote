/**
 * 322. 零钱兑换
 * 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 * 你可以认为每种硬币的数量是无限的。
 * @param coins
 * @param amount
 */

// dp 数组
export function coinChange2(coins: number[], amount: number): number {
  const dp = new Array<number>(amount + 1);
  dp[0] = 0;
  for (let i = 1; i < amount + 1; i++) {
    dp[i] = amount + 1;
  }
  const len = coins.length;
  for (let i = 0; i < amount + 1; i++) {
    for (let j = 0; j < len; j++) {
      const coin = coins[j];
      if (i - coin < 0) continue;
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  return dp[amount] == amount + 1 ? -1 : dp[amount];
}

// 暴力递归
export function coinChange(coins: number[], amount: number): number {
  const len = coins.length;
  function dp(n: number): number {
    if (n == 0) return 0;
    if (n < 0) return -1;
    let res = Number.MAX_VALUE;
    for (let i = 0; i < len; i++) {
      const coin = coins[i];
      const subproblem = dp(n - coin);
      if (subproblem == -1) {
        continue;
      }
      res = Math.min(res, 1 + subproblem);
    }
    return res != Number.MAX_VALUE ? res : -1;
  }
  return dp(amount);
}

// 备忘录
export function coinChange1(coins: number[], amount: number): number {
  const memo = new Array<number>();
  const len = coins.length;
  function dp(n: number): number {
    if (memo[n]) return memo[n];
    if (n == 0) {
      return 0;
    }
    if (n < 0) {
      return -1;
    }
    let res = Number.MAX_VALUE;
    for (let i = 0; i < len; i++) {
      const coin = coins[i];
      const subproblem = dp(n - coin);
      if (subproblem == -1) {
        continue;
      }
      res = Math.min(res, 1 + subproblem);
    }
    memo[n] = res != Number.MAX_VALUE ? res : -1;
    return memo[n];
  }
  return dp(amount);
}
