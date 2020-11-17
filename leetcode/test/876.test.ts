import { ListNode, middleNode } from '../src/876';
import { test, expect } from '@jest/globals';

function createList(nums: number[], pos: number): ListNode[] {
  const arr = nums.map((v) => new ListNode(v));
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (i + 1 < len) {
      arr[i].next = arr[i + 1];
    } else {
      arr[i].next = arr[pos] ? arr[pos] : null;
    }
  }
  return [arr[0], arr[pos] || null];
}

test('876. 链表的中间结点', () => {
  let [head] = createList([1, 2, 3, 4, 5], -1);
  expect(middleNode(head).val).toBe(3);
  [head] = createList([1, 2, 3, 4, 5, 6], -1);
  expect(middleNode(head).val).toBe(4);
});
