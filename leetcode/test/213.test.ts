import { rob } from '../src/213';
import { test, expect } from '@jest/globals';

test('213. 打家劫舍 II', () => {
  expect(rob([2, 3, 2])).toBe(3);
  expect(rob([1, 2, 3, 1])).toBe(4);
  expect(rob([0])).toBe(0);
});
