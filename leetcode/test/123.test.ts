import { maxProfit } from '../src/123';
import { test, expect } from '@jest/globals';

test('123. 买卖股票的最佳时机 III', () => {
  expect(maxProfit([3, 3, 5, 0, 0, 3, 1, 4])).toBe(6);
  expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
  expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
});
