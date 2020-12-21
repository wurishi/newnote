import { autorun, createAtom, IAtom } from 'mobx';

class Clock {
  atom: IAtom;
  intervalHandler = null;
  currentDateTime: Date;

  constructor() {
    this.atom = createAtom(
      'Clock',
      () => this.startTicking(),
      () => this.stopTicking()
    );
  }

  getTime(): Date {
    if (this.atom.reportObserved()) {
      return this.currentDateTime;
    } else {
      return new Date();
    }
  }

  tick(): void {
    this.currentDateTime = new Date();
    this.atom.reportChanged();
  }

  startTicking(): void {
    this.tick();
    this.intervalHandler = setInterval(() => {
      this.tick();
      console.log('tick');
    }, 1000);
  }

  stopTicking(): void {
    clearInterval(this.intervalHandler);
    this.intervalHandler = null;
  }
}

const clock = new Clock();

const dom = document.createElement('div');
document.body.appendChild(dom);
const disposer = autorun(() => {
  dom.textContent = clock.getTime().toString();
});

document.body.addEventListener('click', () => {
  disposer();
});
