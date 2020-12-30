import { intervalIntersection } from '../src/986';
import { test, expect } from '@jest/globals';

test('986. 区间列表的交集', () => {
  expect(
    intervalIntersection(
      [
        [0, 2],
        [5, 10],
        [13, 23],
        [24, 25],
      ],
      [
        [1, 5],
        [8, 12],
        [15, 24],
        [25, 26],
      ]
    )
  ).toEqual([
    [1, 2],
    [5, 5],
    [8, 10],
    [15, 23],
    [24, 24],
    [25, 25],
  ]);
});
