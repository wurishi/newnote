import { Provider } from 'react-redux';
import store from './main';

export default function () {
  function action(type, payload) {
    store.dispatch({ type, payload });
  }

  return (
    <Provider store={store}>
      <button onMouseDown={() => action('TAKE_LEADING', { time: Date.now() })}>
        TAKE_LEADING
      </button>
    </Provider>
  );
}
