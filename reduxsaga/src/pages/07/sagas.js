import { all } from 'redux-saga/effects';

import tl from './sagas/takeleading';

export default function* () {
  yield all([
    tl(), //
  ]);
}
