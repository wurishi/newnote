import { iSub } from '../lib';
import { createCanvas } from '../webgl-utils';

const vertex = ``;

export default class implements iSub {
  name() {
    return 'empty';
  }
  key() {
    return '';
  }
  sort() {
    return 0;
  }
  main() {
    return createCanvas({ bg: 'black' });
  }
  userVertex() {
    return vertex;
  }
}
