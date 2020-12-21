import {
  autorun,
  computed,
  configure,
  observable,
  observe,
  trace,
  when,
} from 'mobx';
import * as mobxUtils from 'mobx-utils';

configure({ enforceActions: 'never' });

const state = observable({
  selection: '',
});

const comp = computed(() => state.selection === 'todo');

const expr = mobxUtils.expr(() => state.selection === 'todo');

autorun(() => {
  console.log('render 1', comp.get());
  // trace(true);
});

autorun(() => {
  console.log('render 2', expr);
});

setInterval(() => {
  state.selection = Math.random() > 0.5 ? 'todo' : 'no';
}, 1000);
