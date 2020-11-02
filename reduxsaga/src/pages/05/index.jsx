import { Provider } from 'react-redux';
import store from './main';

export default function () {
  function action(type, payload) {
    store.dispatch({ type, payload });
  }

  function throttling() {
    action('01_WATCH', {
      dom: document.body,
    });
  }

  return (
    <Provider store={store}>
      <button onMouseDown={throttling}>throttling</button>
      <hr />
    </Provider>
  );
}
