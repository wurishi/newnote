import { test, expect } from '@jest/globals';
import {
  binarySearch,
  left_bound,
  left_bound2,
  right_bound,
} from '../src/binarysearch';

test('二分查找', () => {
  expect(binarySearch([1, 2, 3, 4, 5], 2)).toBe(1);
  expect(binarySearch([1, 2, 3, 4, 5], 10)).toBe(-1);
  expect(binarySearch([1, 2, 3, 4, 5], -2)).toBe(-1);
  expect(binarySearch([1, 2, 3, 4, 5], 5)).toBe(4);
  expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)).toBe(6);
  expect(binarySearch([2, 2, 4], 2)).toBe(1);

  expect(left_bound([1, 2, 3, 4, 5], 2)).toBe(1);
  expect(left_bound([1, 2, 3, 4, 5], 10)).toBe(-1);
  expect(left_bound([1, 2, 3, 4, 5], -2)).toBe(-1);
  expect(left_bound([1, 2, 3, 4, 5], 5)).toBe(4);
  expect(left_bound([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)).toBe(6);
  expect(left_bound([2, 2, 4], 2)).toBe(0);

  expect(left_bound2([1, 2, 3, 4, 5], 2)).toBe(1);
  expect(left_bound2([1, 2, 3, 4, 5], 10)).toBe(-1);
  expect(left_bound2([1, 2, 3, 4, 5], -2)).toBe(-1);
  expect(left_bound2([1, 2, 3, 4, 5], 5)).toBe(4);
  expect(left_bound2([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)).toBe(6);
  expect(left_bound2([2, 2, 4], 2)).toBe(0);

  expect(right_bound([1, 2, 3, 4, 5], 2)).toBe(1);
  expect(right_bound([1, 2, 3, 4, 5], 10)).toBe(-1);
  expect(right_bound([1, 2, 3, 4, 5], -2)).toBe(-1);
  expect(right_bound([1, 2, 3, 4, 5], 5)).toBe(4);
  expect(right_bound([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)).toBe(6);
  expect(right_bound([2, 2, 4], 2)).toBe(1);
});
