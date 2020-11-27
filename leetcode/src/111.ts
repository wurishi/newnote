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
 * 111. 二叉树的最小深度
 * 给定一个二叉树，找出其最小深度。
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * 说明：叶子节点是指没有子节点的节点。
 * @param root
 */
export function minDepth(root: TreeNode | null): number {
  class Queue {
    items: WeakMap<any, any[]>;
    constructor() {
      this.items = new WeakMap<any, any[]>();
      this.items.set(this, []);
    }

    public offer(...element: any[]): void {
      const q = this.items.get(this) as any[];
      q.push(...element);
    }

    public poll(): any {
      const q = this.items.get(this) as any[];
      return q.shift();
    }

    public isEmpty(): boolean {
      return this.size() === 0;
    }

    public size(): number {
      const q = this.items.get(this) as any[];
      return q.length;
    }

    public clear(): void {
      this.items.set(this, []);
    }
  }

  if (root == null) return 0;
  const q = new Queue();
  q.offer(root);
  let depth = 1;
  while (!q.isEmpty()) {
    const sz = q.size();
    for (let i = 0; i < sz; i++) {
      const cur: TreeNode = q.poll();
      if (cur.left == null && cur.right == null) {
        return depth;
      }
      if (cur.left != null) {
        q.offer(cur.left);
      }
      if (cur.right != null) {
        q.offer(cur.right);
      }
    }
    depth++;
  }
  return depth;
}
