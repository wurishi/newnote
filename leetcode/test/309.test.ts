import { maxProfit } from '../src/309';
import { test, expect } from '@jest/globals';

test('309. 最佳买卖股票时机含冷冻期', () => {
  expect(maxProfit([1, 2, 3, 0, 2])).toBe(3);
});
