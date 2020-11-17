import { twoSum } from '../src/167';
import { test, expect } from '@jest/globals';

test('167. 两数之和 II - 输入有序数组', () => {
  expect(twoSum([2, 7, 11, 15], 9)).toEqual([1, 2]);
});
