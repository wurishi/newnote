import { ListNode, addTwoNumbers } from '../src/2';
import { test, expect } from '@jest/globals';

test('2. 两数相加', () => {
  const l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
  const l2 = new ListNode(5, new ListNode(6, new ListNode(4)));
  expect(addTwoNumbers(l1, l2)).toStrictEqual(new ListNode(7, new ListNode(0, new ListNode(8))));
});
