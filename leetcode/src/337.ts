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
/**
 * 337. 打家劫舍 III
 * 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。
 * 计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。
 * @param root 
 */
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
