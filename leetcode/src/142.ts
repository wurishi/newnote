export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 142. 环形链表 II
 * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 * @param head 
 */
export function detectCycle(head: ListNode | null): ListNode | null {
  let fast = head;
  let slow = head;
  while (fast != null && fast.next != null) {
    fast = fast.next.next;
    slow = (slow as any).next;
    if (fast == slow) break;
  }
  if (fast == null || fast.next == null) {
    return null;
  }
  slow = head;
  while (slow != fast) {
    fast = (fast as any).next;
    slow = (slow as any).next;
  }
  return slow;
}
