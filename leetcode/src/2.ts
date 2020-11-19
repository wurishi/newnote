/**
 * 2. 两数相加
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let res = new ListNode(0);
  let current = res;
  while (l1 || l2) {
    const val = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + current.val;
    if (val < 10) {
      current.val = val;
      current.next = new ListNode(0);
    } else {
      current.val = val - 10;
      current.next = new ListNode(1);
    }
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
    if (l1 || l2) {
      current = current.next;
    } else if (current.next && current.next.val === 0) {
      current.next = null;
    }
  }
  if (current.next && current.next.val === 0) {
    // 0 开头要去掉, 或者在上面.next 处使用 tmpval 代替 new ListNode 减少节点的创建销毁的消耗
    current.next = null;
  }
  return res;
}
