import { lengthOfLongestSubstring } from '../src/3';
import { test, expect } from '@jest/globals';

test('3. 无重复字符的最长子串', () => {
  expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
  expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
  expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  expect(lengthOfLongestSubstring('aab')).toBe(2);
});
