import { combineReducers } from 'redux';

const defaultState = {
  count: 0,
};

const ACTIONS_HANDLER = {
  INCREMENT(state) {
    return { ...state, count: state.count + 1 };
  },
  DECREMENT(state) {
    return { ...state, count: state.count - 1 };
  },
};

function reducer(state = defaultState, action) {
  const handler = ACTIONS_HANDLER[action.type];
  return handler ? handler(state, action) : state;
}

export default combineReducers({
  '02': reducer,
});
