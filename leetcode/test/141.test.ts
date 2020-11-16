import { ListNode, hasCycle } from '../src/141';
import { test, expect } from '@jest/globals';

test('141. 环形链表', () => {
  let lastNode = new ListNode(-4);
  let node = new ListNode(3, new ListNode(2, new ListNode(0, lastNode)));
  lastNode.next = node.next;
  expect(hasCycle(node)).toBeTruthy();

  lastNode = new ListNode(2);
  node = new ListNode(1, lastNode);
  lastNode.next = node;
  expect(hasCycle(node)).toBeTruthy();

  node = new ListNode(1);
  node.next = node;
  expect(hasCycle(node)).toBeTruthy();
});
