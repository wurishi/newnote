export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 19. 删除链表的倒数第N个节点
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 * @param head 
 * @param n 
 */
export function removeNthFromEnd(
  head: ListNode | null,
  n: number
): ListNode | null {
  let fast = head;
  let slow = head;
  while (n-- > 0) {
    fast = (fast as any).next;
  }
  if (!fast) {
    return (head as any).next;
  }
  while (fast && fast.next) {
    fast = fast.next;
    slow = (slow as any).next;
  }
  (slow as any).next = (slow as any).next.next;
  return head;
}
