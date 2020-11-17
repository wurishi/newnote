export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 876. 链表的中间结点
 * 给定一个头结点为 head 的非空单链表，返回链表的中间结点。
 * 如果有两个中间结点，则返回第二个中间结点。
 * @param head
 */
export function middleNode(head: ListNode | null): ListNode | null {
  let fast = head;
  let slow = head;
  while (fast != null && fast.next != null) {
    fast = fast.next.next;
    slow = (slow as any).next;
  }
  return slow;
}
