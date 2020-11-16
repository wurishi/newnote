import { searchRange } from '../src/34';
import { test, expect } from '@jest/globals';

test('34. 在排序数组中查找元素的第一个和最后一个位置', () => {
  expect(searchRange([5, 7, 7, 8, 8, 10], 8)).toEqual([3, 4]);
  expect(searchRange([5, 7, 7, 8, 8, 10], 6)).toEqual([-1, -1]);
});
