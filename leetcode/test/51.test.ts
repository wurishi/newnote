import { solveNQueens } from '../src/51';
import { test, expect } from '@jest/globals';

test('51. N 皇后', () => {
  expect(solveNQueens(4)).toEqual([
    ['.Q..', '...Q', 'Q...', '..Q.'],
    ['..Q.', 'Q...', '...Q', '.Q..'],
  ]);
});
