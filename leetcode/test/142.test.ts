import { ListNode, detectCycle } from '../src/142';
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

test('142. 环形链表 II', () => {
  let [head, chead] = createList([3, 2, 0, -4], 1);
  expect(detectCycle(head)).toBe(chead);

  [head, chead] = createList([1, 2], 0);
  expect(detectCycle(head)).toBe(chead);

  [head, chead] = createList([1], -1);
  expect(detectCycle(head)).toBe(chead);
});
