import { test, expect } from '@jest/globals';
import { binarySearch } from '../src/binarysearch';

test('二分查找', () => {
  expect(binarySearch([1, 2, 3, 4, 5], 2)).toBe(1);
  expect(binarySearch([1, 2, 3, 4, 5], 10)).toBe(-1);
  expect(binarySearch([1, 2, 3, 4, 5], -2)).toBe(-1);
  expect(binarySearch([1, 2, 3, 4, 5], 5)).toBe(4);
  expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)).toBe(6);
});
