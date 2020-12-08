import { maxProfit } from '../src/188';
import { test, expect } from '@jest/globals';

test('188. 买卖股票的最佳时机 IV', () => {
  expect(maxProfit(2, [2, 4, 1])).toBe(2);
  expect(maxProfit(2, [3, 2, 6, 5, 0, 3])).toBe(7);
});
