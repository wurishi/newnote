import { removeDuplicates } from '../src/26';
import { test, expect } from '@jest/globals';

test('26. 删除排序数组中的重复项', () => {
  let arr = [1, 1, 2];
  expect(arr.slice(0, removeDuplicates(arr))).toEqual([1, 2]);
  arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  expect(arr.slice(0, removeDuplicates(arr))).toEqual([0, 1, 2, 3, 4]);
});
