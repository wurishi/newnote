import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function mockAPI(userId) {
  return new Promise((r) => {
    setTimeout(() => {
      r({
        no: 200,
        data: {
          userId,
          name: 'Test Name',
        },
      });
    }, 1000);
  });
}

function* fetchUser(action) {
  try {
    const user = yield call(mockAPI, action.payload.userId);
    yield put({ type: 'USER_FETCH_SUCCESS', user });
  } catch (error) {
    yield put({ type: 'USeR_FETCH_FAILED', message: error.message });
  }
}

function* mySaga() {
  yield takeEvery('USER_FETCH_REQUESTED', fetchUser);
}

// 也可以使用 takeLatest

export default mySaga;
