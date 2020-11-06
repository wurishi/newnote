class Test {
  constructor(name) {
    this.name = name;
  }

  logger() {
    console.log('Hello', this.name);
  }

  set bar(value) {
    throw new Error('Test Error bar');
  }

}

class Apple extends Test {
  constructor() {
    super('Apple');
  }

  bar() {}

}