import { minDepth, TreeNode } from '../src/111';
import { test, expect } from '@jest/globals';

test('111. 二叉树的最小深度', () => {
  let tree = new TreeNode(
    3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7))
  );
  expect(minDepth(tree)).toBe(2);
});
