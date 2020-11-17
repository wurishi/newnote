import { RandomizedSet } from '../src/380';
import { test, expect } from '@jest/globals';

test('380. 常数时间插入、删除和获取随机元素', () => {
  const randomSet = new RandomizedSet();

  expect(randomSet.insert(1)).toBeTruthy();
  expect(randomSet.remove(2)).toBeFalsy();
  expect(randomSet.insert(2)).toBeTruthy();
  expect([1, 2].indexOf(randomSet.getRandom())).toBeGreaterThanOrEqual(0);
  expect(randomSet.remove(1)).toBeTruthy();
  expect(randomSet.insert(2)).toBeFalsy();
  expect(randomSet.getRandom()).toBe(2);
});
