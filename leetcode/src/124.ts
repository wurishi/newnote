export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * 124. 二叉树中的最大路径和
 * 给定一个非空二叉树，返回其最大路径和。
 * 本题中，路径被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。
 * @param root 
 */
export function maxPathSum(root: TreeNode | null): number {
  let ans = Number.MIN_SAFE_INTEGER; // Number.MIN_VALUE 表示的是接近 0 ,但不是负数的最小的数
  oneSideMax(root);
  function oneSideMax(root: TreeNode | null): number {
    if (root == null) {
      return 0;
    }
    const left = Math.max(0, oneSideMax(root.left));
    const right = Math.max(0, oneSideMax(root.right));
    ans = Math.max(ans, left + right + root.val);
    return Math.max(left, right) + root.val;
  }
  return ans;
}
