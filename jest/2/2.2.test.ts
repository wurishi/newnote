/// <reference path="../node_modules/@types/jest/index.d.ts" />

import { timerGame } from './2.2';

beforeEach(() => {
  jest.useFakeTimers();
});

test('waits 1 second before ending the game', () => {
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
