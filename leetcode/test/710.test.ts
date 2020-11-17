import { Solution } from '../src/710';
import { test, expect } from '@jest/globals';

test('710. 黑名单中的随机数', () => {
  const s = new Solution(10, [2]);
  for (let i = 0; i < 1000; i++) {
    expect(s.pick()).not.toBe(2);
  }
});
