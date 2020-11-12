import { test, expect } from '@jest/globals';
import { checkInclusion } from '../src/567';

test('567. 字符串的排列', () => {
  expect(checkInclusion('ab', 'eidbaooo')).toBeTruthy();
  expect(checkInclusion('ab', 'eidboaoo')).toBeFalsy();
  expect(checkInclusion('abcdxabcde', 'abcdeabcdx')).toBeTruthy();
});
