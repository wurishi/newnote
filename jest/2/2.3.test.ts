/// <reference path="../node_modules/@types/jest/index.d.ts" />

const m = require('./2.3');
const fn1 = m.fn1;
const fn3 = m.fn3;
import { fn2 } from './2.3';

describe('mock', () => {
  beforeEach(() => {
    jest.mock('./user');
    jest.mock('lodash');
    jest.mock('@d-fischer/deprecate');
  });
  afterEach(() => {
    jest.unmock('lodash');
  });
  test('fn1 mock', () => {
    expect(fn1(10, 20)).toBe('1020');
  });
});

// test('fn1', () => {
//   expect(fn1(10, 20)).toBe(30);
// });

test('fn3', () => {
  expect(fn3()).toEqual({ name: 'User' });
});

// test('fn2', () => {
//   expect(fn2()).toEqual('Hello');
// });
