import { all, call, cancelled, delay, fork, put } from 'redux-saga/effects';

function* fetchResource(a) {
  try {
    yield delay(1000);
    yield put({ type: a + '_SUCCESS' });
  } catch (error) {
    yield put({ type: a + '_ERROR' });
  } finally {
    if (yield cancelled()) {
      yield put({ type: a + '_FINALLY' });
    }
  }
}

function* attached() {
  const task1 = yield fork(fetchResource, 'users');
  const task2 = yield fork(fetchResource, 'comments');
  yield delay(500);
}

export default function* () {
  yield all([
    attached(), //
  ]);
}
