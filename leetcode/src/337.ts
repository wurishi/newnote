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

const memo = new WeakMap<TreeNode, number>();
export function rob(root: TreeNode | null): number {
  if (root == null) return 0;
  if (memo.has(root)) {
    return memo.get(root);
  }
  let do_it =
    root.val +
    (root.left == null ? 0 : rob(root.left.left) + rob(root.left.right)) +
    (root.right == null ? 0 : rob(root.right.left) + rob(root.right.right));
  let not_do = rob(root.left) + rob(root.right);

  const res = Math.max(do_it, not_do);
  memo.set(root, res);
  return res;
}

export function rob2(root: TreeNode | null) {
  const res = dp(root);
  return Math.max(res[0], res[1]);
}

function dp(root: TreeNode): number[] {
  if (root == null) {
    return [0, 0];
  }
  const left = dp(root.left);
  const right = dp(root.right);

  const rob = root.val + left[0] + right[0];
  const not_rob = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

  return [not_rob, rob];
}
