import { maxProfit, maxProfit_k_1 } from '../src/121';
import { test, expect } from '@jest/globals';

test('121. 买卖股票的最佳时机', () => {
  expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);

  expect(maxProfit_k_1([7, 1, 5, 3, 6, 4])).toBe(5);
  expect(maxProfit_k_1([7, 6, 4, 3, 1])).toBe(0);
});
