import { merge } from '../src/56';
import { test, expect } from '@jest/globals';

test('56. 合并区间', () => {
  expect(
    merge([
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ])
  ).toEqual([
    [1, 6],
    [8, 10],
    [15, 18],
  ]);

  expect(
    merge([
      [1, 4],
      [4, 5],
    ])
  ).toEqual([[1, 5]]);
});
