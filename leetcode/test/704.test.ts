import { search } from '../src/704';
import { test, expect } from '@jest/globals';

test('704. 二分查找', () => {
  expect(search([-1, 0, 3, 5, 9, 12], 9)).toBe(4);
  expect(search([-1, 0, 3, 5, 9, 12], 2)).toBe(-1);
});
