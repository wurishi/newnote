import { Provider } from 'react-redux';
import store from './main';

export default function () {
  function action(type) {
    store.dispatch({ type });
  }

  return (
    <Provider store={store}>
      <button onClick={() => action('REQUEST')}>REQUEST</button>
    </Provider>
  );
}
