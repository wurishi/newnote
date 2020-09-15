function* f() {}

f.prototype.hello = function () {
    return 'hi';
};

const gen1 = f();

console.log(gen1.hello());

const genPrototype = Object.getPrototypeOf(f).prototype;
genPrototype.hi = () => console.log('hello world');

const gen2 = f();
gen2.hi();

!(function () {
    const proto = Object.getPrototypeOf.bind(Object);
    const iteratorPrototype = proto(proto([][Symbol.iterator]()));

    console.log(iteratorPrototype);

    console.log(iteratorPrototype == proto(proto(function* () {}.prototype)));
    // console.log(iteratorPrototype == proto(proto(Object)));
})();

!(function () {
    function* gen() {
        'use strict';
        yield this;
    }
    const [functionStarThis] = gen();
    console.log(functionStarThis);

    const obj = { method: gen };
    const [methodThis] = obj.method();
    console.log(methodThis == this);
})();
