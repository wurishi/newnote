import { removeElement } from '../src/27';
import { test, expect } from '@jest/globals';

test('27. 移除元素', () => {
  let arr = [3, 2, 2, 3];
  expect(removeElement(arr, 3)).toBe(2);
  expect(arr).toEqual([2, 2]);
  arr = [0, 1, 2, 2, 3, 0, 4, 2];
  expect(removeElement(arr, 2)).toBe(5);
  expect(arr).toEqual([0, 1, 3, 0, 4]);
});
