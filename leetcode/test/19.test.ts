import { ListNode, removeNthFromEnd } from '../src/19';
import { test, expect } from '@jest/globals';

function getListCount(head: ListNode): number {
  let count = 0;
  while (head) {
    count += head.val;
    head = head.next;
  }
  return count;
}

test('19. 删除链表的倒数第N个节点', () => {
  const head = new ListNode(
    1,
    new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
  );
  expect(getListCount(head)).toBe(15);
  expect(getListCount(removeNthFromEnd(head, 2))).toBe(11);
});
