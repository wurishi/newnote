/// <reference path="../node_modules/@jest/core/build/jest.d.ts" />

import { Hello } from './1.1.hello';

test('Test Hello', () => {
  expect(Hello('YY')).toBe('Hello YY');
});
