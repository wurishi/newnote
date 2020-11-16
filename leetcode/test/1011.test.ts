import { shipWithinDays } from '../src/1011';
import { test, expect } from '@jest/globals';

test('1011. 在 D 天内送达包裹的能力', () => {
  expect(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)).toBe(15);
  expect(shipWithinDays([3, 2, 2, 4, 1, 4], 3)).toBe(6);
  expect(shipWithinDays([1, 2, 3, 1, 1], 4)).toBe(3);
});
