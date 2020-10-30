import { all } from 'redux-saga/effects';

import throttling from './sagas/throttling';

export default function* () {
  yield all([
    throttling(), //
  ]);
}
