import fn from '../src/1';
import { jest, test, expect } from '@jest/globals';

test('1. 两数之和', () => {
  expect(fn([2, 7, 11, 15], 9)).toEqual([0, 1]);
});
