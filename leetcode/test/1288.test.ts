import { removeCoveredIntervals } from '../src/1288';
import { test, expect } from '@jest/globals';

test('1288. 删除被覆盖区间', () => {
  expect(
    removeCoveredIntervals([
      [1, 4],
      [3, 6],
      [2, 8],
    ])
  ).toBe(2);
});
