import { rob } from '../src/198';
import { test, expect } from '@jest/globals';

test('198. 打家劫舍', () => {
  expect(rob([1, 2, 3, 1])).toBe(4);
  expect(rob([2, 7, 9, 3, 1])).toBe(12);
});
