import TwoSum, { TwoSum2 } from '../src/170';
import { test, expect } from '@jest/globals';

test('170. 两数之和III', () => {
  const twoSum = new TwoSum();
  twoSum.add(3);
  twoSum.add(3);
  twoSum.add(2);
  twoSum.add(5);

  expect(twoSum.find(6)).toBeTruthy();

  expect(twoSum.find(7)).toBeTruthy();

  expect(twoSum.find(10)).toBeFalsy();
});

test('170. 两数之和 III', () => {
  const twoSum = new TwoSum2();
  twoSum.add(3);
  twoSum.add(3);
  twoSum.add(2);
  twoSum.add(5);

  expect(twoSum.find(6)).toBeTruthy();

  expect(twoSum.find(7)).toBeTruthy();

  expect(twoSum.find(10)).toBeFalsy();
})