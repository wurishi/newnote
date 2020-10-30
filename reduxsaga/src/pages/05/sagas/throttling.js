import { call, cancelled, put, take } from 'redux-saga/effects';
import { END, eventChannel } from 'redux-saga';

function createEventChannel(dom) {
  return eventChannel((emitter) => {
    const handler = (e) => {
      console.log(e);
      if (e.key === 'Enter') {
        emitter(END);
      } else {
        emitter(e.key);
      }
    };
    dom.addEventListener('keydown', handler);
    return () => {
      dom.removeEventListener('keydown', handler);
    };
  });
}

export default function* watchInput() {
  while (true) {
    const { payload } = yield take('01_WATCH');
    const chan = yield call(createEventChannel, payload.dom);
    try {
      while (true) {
        const k = yield take(chan);
        // if (k !== END) {
        yield put({ type: '01_INPUT', key: k });
        // }
      }
    } catch (error) {
    } finally {
      yield put({ type: '01_WATCH_END' });
      // if (yield cancelled()) {
      //   chan.close();
      // }
    }
  }
}
