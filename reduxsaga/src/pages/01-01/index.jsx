import {} from 'redux';
import store from './main';

export default function (props = { userId: '', dispatch: () => {} }) {
  function onSomeButtonClicked() {
    const { userId, dispatch } = props;
    dispatch({ type: 'USER_FETCH_REQUESTED', payload: { userId } });
  }

  return (
    <div>
      <h2>01-01</h2>
      <button onClick={onSomeButtonClicked}>USER_FETCH</button>
    </div>
  );
}
