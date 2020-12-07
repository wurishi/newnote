import { maxProfit } from '../src/714';
import { test, expect } from '@jest/globals';

test('714. 买卖股票的最佳时机含手续费', () => {
  expect(maxProfit([1, 3, 2, 8, 4, 9], 2)).toBe(8);
});
