export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}


/**
 * 141. 环形链表
 * 给定一个链表，判断链表中是否有环。
 * @param head 
 */
export function hasCycle(head: ListNode | null): boolean {
  let fast = head,
    slow = head;

  while (fast != null && fast.next != null) {
    fast = fast.next.next;
    slow = (slow as any).next;
    if (fast == slow) return true;
  }
  return false;
}
