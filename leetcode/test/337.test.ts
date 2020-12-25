import { rob, TreeNode, rob2 } from '../src/337';
import { test, expect } from '@jest/globals';

test('337. 打家劫舍 III', () => {
  const tree1 = new TreeNode(
    3,
    new TreeNode(2, null, new TreeNode(3)),
    new TreeNode(3, null, new TreeNode(1))
  );
  expect(rob(tree1)).toBe(7);

  const tree2 = new TreeNode(
    3, //
    new TreeNode(4, new TreeNode(1), new TreeNode(3)),
    new TreeNode(5, null, new TreeNode(1))
  );

  expect(rob(tree2)).toBe(9);

  expect(rob2(tree1)).toBe(7);
  expect(rob2(tree2)).toBe(9);
});
