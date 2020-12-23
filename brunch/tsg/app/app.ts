import Demo1_1 from './1';
// import test from './test';
// test();

class App {
  constructor() {
    console.log('TS App initialized.');
    this.hello();

    Demo1_1();
  }

  private hello() {
    console.log(`Hello ${this.who} !`);
  }

  private who = 'World';
}

export = new App();
