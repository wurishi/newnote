import { findAnagrams } from '../src/438';
import { test, expect } from '@jest/globals';

test('438. 找到字符串所有字母异位词', () => {
  expect(findAnagrams('cbaebabacd', 'abc')).toEqual([0, 6]);
  expect(findAnagrams('abab', 'ab')).toEqual([0, 1, 2]);
});
