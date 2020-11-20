import { maxPathSum, TreeNode } from '../src/124';
import { test, expect } from '@jest/globals';

test('124', () => {
  // let node = new TreeNode(1, new TreeNode(2), new TreeNode(3));
  // expect(maxPathSum(node)).toBe(6);
  const node1 = new TreeNode(-3, null, null);
  expect(maxPathSum(node1)).toBe(-3);
});
