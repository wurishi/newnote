/// <reference path="../node_modules/@types/jest/index.d.ts" />

import { timerGame, infiniteTimerGame } from './2.2';

beforeEach(() => {
  jest.useFakeTimers();
});

test('waits 1 second before ending the game', () => {
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

describe('mock time describe 1', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test('test runAllTime', () => {
    const callback = jest.fn();
    timerGame(callback);

    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('infiniteTimerGame', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('schedule a 10-second timer after 1 second', () => {
    const callback = jest.fn();

    infiniteTimerGame(callback);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    expect(callback).not.toBeCalled();

    jest.runOnlyPendingTimers();

    expect(callback).toBeCalled();

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});

describe('advanceTimersByTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('ad test', () => {
    const callback = jest.fn();
    timerGame(callback);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
