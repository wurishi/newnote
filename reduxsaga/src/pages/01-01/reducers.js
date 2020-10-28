import { combineReducers } from 'redux';

const defaultState = {
  user: null,
};

const ACTIONS_HANDLER = {};

export default function (state = defaultState, action) {
  const handler = ACTIONS_HANDLER[action.type];
  return handler ? handler(state, action) : state;
}
