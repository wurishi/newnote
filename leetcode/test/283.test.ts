import { moveZeroes } from '../src/283';
import { test, expect } from '@jest/globals';

test('283. 移动零', () => {
  let arr = [0, 1, 0, 3, 12];
  moveZeroes(arr);
  expect(arr).toEqual([1, 3, 12, 0, 0]);
});
