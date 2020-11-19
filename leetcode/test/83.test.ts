import { ListNode, deleteDuplicates } from '../src/83';
import { test, expect } from '@jest/globals';

test('83. 删除排序链表中的重复元素', () => {
  let head = new ListNode(1, new ListNode(1, new ListNode(2)));
  expect(deleteDuplicates(createList([1, 1, 2], -1)[0])) //
    .toEqual(createList([1, 2], -1)[0]);

  expect(deleteDuplicates(createList([1, 1, 2, 3, 3], -1)[0])).toEqual(
    createList([1, 2, 3], -1)[0]
  );
});

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
