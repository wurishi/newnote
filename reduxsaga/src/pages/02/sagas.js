import { all, delay, put, takeEvery } from 'redux-saga/effects';

function* helloSaga() {
  console.log('Hello Sagas!');
}

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga() {
  yield all([
    helloSaga(), //
    watchIncrementAsync(),
  ]);
}
