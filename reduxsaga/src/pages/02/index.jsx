import { Provider } from 'react-redux';
import store from './main';
import Counter from './counter';
import { useEffect, useState } from 'react';

export default function () {
  const [count, setCount] = useState(store.getState()['02'].count);
  useEffect(() => {
    const un = store.subscribe(() => {
      setCount(store.getState()['02'].count);
    });
    return () => {
      un();
    };
  }, []);
  function action(type) {
    store.dispatch({ type });
  }
  return (
    <Provider store={store}>
      <Counter
        value={count}
        onIncrement={() => action('INCREMENT')}
        onDecrement={() => action('DECREMENT')}
        onIncrementAsync={() => action('INCREMENT_ASYNC')}
      />
    </Provider>
  );
}
