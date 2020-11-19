export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 83. 删除排序链表中的重复元素
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
 * @param head
 */
export function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (head == null) {
    return null;
  }
  let slow = head,
    fast = head;
  while (fast != null) {
    if (fast.val != slow.val) {
      slow.next = fast;
      slow = slow.next;
    }
    fast = (fast as any).next;
  }
  slow.next = null;
  return head;
}
