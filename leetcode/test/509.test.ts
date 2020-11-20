import { fib, fib2, fib3, fib4 } from '../src/509';
import { test, expect } from '@jest/globals';

test('509. 斐波那契数', () => {
  expect(fib(2)).toBe(1);
  expect(fib(3)).toBe(2);
  expect(fib(4)).toBe(3);

  expect(fib2(2)).toBe(1);
  expect(fib2(3)).toBe(2);
  expect(fib2(4)).toBe(3);

  expect(fib3(2)).toBe(1);
  expect(fib3(3)).toBe(2);
  expect(fib3(4)).toBe(3);

  expect(fib4(2)).toBe(1);
  expect(fib4(3)).toBe(2);
  expect(fib4(4)).toBe(3);
});
