import { coinChange, coinChange2, coinChange1 } from '../src/322';
import { test, expect } from '@jest/globals';

test('322. 零钱兑换', () => {
  expect(coinChange([1, 2, 5], 11)).toBe(3);
  expect(coinChange([2], 3)).toBe(-1);
  expect(coinChange([1], 0)).toBe(0);
  expect(coinChange([1], 1)).toBe(1);
  expect(coinChange([1], 2)).toBe(2);

  expect(coinChange1([1, 2, 5], 11)).toBe(3);
  expect(coinChange1([2], 3)).toBe(-1);
  expect(coinChange1([1], 0)).toBe(0);
  expect(coinChange1([1], 1)).toBe(1);
  expect(coinChange1([1], 2)).toBe(2);

  expect(coinChange2([1, 2, 5], 11)).toBe(3);
  expect(coinChange2([2], 3)).toBe(-1);
  expect(coinChange2([1], 0)).toBe(0);
  expect(coinChange2([1], 1)).toBe(1);
  expect(coinChange2([1], 2)).toBe(2);
});
