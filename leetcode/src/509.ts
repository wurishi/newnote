/**
 * 509. 斐波那契数
 * 斐波那契数，通常用 F(n) 表示，形成的序列称为斐波那契数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和
 * @param N
 */

// 暴力递归
export function fib(N: number): number {
  if (N == 1 || N == 2) return 1;
  return fib(N - 1) + fib(N - 2);
}

// 带备忘录的递归解法
export function fib2(N: number): number {
  if (N < 1) return 0;
  const memo = new Array<number>();
  function helper(memo: Array<number>, n: number): number {
    if (n == 1 || n == 2) return 1;
    if (memo[n]) return memo[n];
    memo[n] = helper(memo, n - 1) + helper(memo, n - 2);
    return memo[n];
  }
  return helper(memo, N);
}

// dp 数组的迭代解法
export function fib3(N: number): number {
  if (N < 1) return 0;
  const dp = new Array<number>();
  dp[1] = dp[2] = 1;
  for (let i = 3; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[N];
}

// 只需要保存之前的两个状态即可, 即 i-1, i-2
export function fib4(N: number): number {
  if (N < 1) {
    return 0;
  }
  if (N == 1 || N == 2) {
    return 1;
  }
  let prev = 1,
    curr = 1;
  for (let i = 3; i <= N; i++) {
    const sum = prev + curr;
    prev = curr;
    curr = sum;
  }
  return curr;
}
