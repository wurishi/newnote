import { test, expect } from '@jest/globals';
import { findMedianSortedArrays, findMedianSortedArrays2 } from '../src/4';

test('4. 寻找两个正序数组的中位数', () => {
  expect(findMedianSortedArrays([1, 3], [2])).toBeCloseTo(2);
  expect(findMedianSortedArrays([1, 2], [3, 4])).toBeCloseTo(2.5);
  expect(findMedianSortedArrays([0, 0], [0, 0])).toBeCloseTo(0);
  expect(findMedianSortedArrays([], [1])).toBeCloseTo(1);
  expect(findMedianSortedArrays([2], [])).toBeCloseTo(2);
});

test('4. 寻找两个正序数组的中位数 方案二', () => {
  expect(findMedianSortedArrays2([1, 3], [2])).toBeCloseTo(2);
  expect(findMedianSortedArrays2([1, 2], [3, 4])).toBeCloseTo(2.5);
  expect(findMedianSortedArrays2([0, 0], [0, 0])).toBeCloseTo(0);
  expect(findMedianSortedArrays2([], [1])).toBeCloseTo(1);
  expect(findMedianSortedArrays2([2], [])).toBeCloseTo(2);
});