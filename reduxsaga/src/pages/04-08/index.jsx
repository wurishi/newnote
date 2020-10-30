import { Provider } from 'react-redux';
import store from './main';

export default function () {
  return (
    <Provider store={store}>
      <h2>04-08</h2>
    </Provider>
  );
}
