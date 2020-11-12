import { minWindow } from '../src/76';

import { test, expect } from '@jest/globals';

test('76. 最小覆盖子串', () => {
  expect(minWindow('ADOBECODEBANC', 'ABC')).toBe('BANC');
  expect(minWindow('a', 'a')).toBe('a');
});
