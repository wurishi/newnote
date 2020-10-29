import { Provider } from 'react-redux';
import store from './main';

export default function() {
  return(
    <Provider store={store} >
      04-05
    </Provider>
  );
}