"use strict";

require("core-js/modules/es7.promise.finally");

window.document.addEventListener('mousedown', async () => {
  await new Promise(r => setTimeout(r, 1000));
  console.log(1);
});

class Demo {
  constructor(name) {
    this.name = name;

    this.sayHi = () => {
      console.log(this.name + ' hi!');
    };
  }

}

Promise.resolve().finally(); // const babel = require('@babel/core');
// babel.transform('async function() {}');