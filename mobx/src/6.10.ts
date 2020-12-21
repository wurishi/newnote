import { autorun, observable } from 'mobx';
import { createTransformer } from 'mobx-utils';

const store = observable({
  boxes: [],
  arrows: [],
  selection: null,
});

const states = [];

const serializeState = createTransformer((store: any) => ({
  boxes: store.boxes.map(serializeBox),
}));

autorun(() => {
  states.push(serializeState(store));
});

const serializeBox = createTransformer((box: any) => {
  console.log('run box', box.id);
  return { ...box };
});

store.boxes.push({ id: 1, name: 'box1' });

store.boxes.push({ id: 2, name: 'box2' });

store.boxes.push({ id: 3, name: 'box3' });

(store.boxes[1] as any).name = 'Hello';
