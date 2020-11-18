import { removeDuplicateLetters } from '../src/316';
import { test, expect } from '@jest/globals';

test('316. 去除重复字母', () => {
  expect(removeDuplicateLetters('bcabc')).toBe('abc');
  expect(removeDuplicateLetters('cbacdcbc')).toBe('acdb');
});
