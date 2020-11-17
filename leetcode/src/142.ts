export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

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
