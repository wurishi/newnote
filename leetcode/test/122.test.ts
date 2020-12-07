import { maxProfit } from '../src/122';
import { test, expect } from '@jest/globals';

test('122. 买卖股票的最佳时机 II', () => {
  expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(7);
  expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
  expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
});
