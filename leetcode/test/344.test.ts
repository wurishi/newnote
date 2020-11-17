import { reverseString } from '../src/344';
import { test, expect } from '@jest/globals';

test('344. 反转字符串', () => {
  let s = ['h', 'e', 'l', 'l', 'o'];
  reverseString(s);
  expect(s).toEqual(['o', 'l', 'l', 'e', 'h']);
  s = ['H', 'a', 'n', 'n', 'a', 'h'];
  reverseString(s);
  expect(s).toEqual(['h', 'a', 'n', 'n', 'a', 'H']);
});
