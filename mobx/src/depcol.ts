const man: any = {
  height: 180,
  weight: 70,
  wealth: 1000000000,
};

class Observer {
  constructor(obj: any) {
    this.walk(obj);
  }

  walk(obj: any) {
    Object.keys(obj).forEach((prop) => {
      this[prop] = obj[prop];
      this.proxyData(obj, prop);
      this.defineReactive(this, prop, obj[prop]);
    });
  }

  proxyData(obj: any, prop: string) {
    const _this = this;
    Object.defineProperty(obj, prop, {
      get() {
        return _this[prop];
      },
      set(newVal) {
        _this[prop] = newVal;
      },
    });
  }

  defineReactive(obj: any, prop: string, val: any) {
    const dep = new Dep();
    Object.defineProperty(obj, prop, {
      get() {
        console.log(`${prop} - 被读取!`);
        dep.getDeps();
        return val;
      },
      set(newVal) {
        if (newVal === val) return;
        val = newVal;
        console.log(`${prop} - 被修改!`);
        dep.notify();
      },
    });
  }
}

// 添加 Watcher
class Watcher {
  constructor(obj: any, prop: string, computed: any, callback: any) {
    this.getVal(obj, prop, computed, callback);
  }

  getVal(obj: any, prop: string, computed: any, callback: any) {
    Object.defineProperty(obj, prop, {
      get() {
        Dep.target = callback;
        console.log(`computed属性 - ${prop}被读取!`);
        return computed();
      },
      set() {
        console.error('计算属性不可被修改!');
      },
    });
  }
}

// 观察依赖
class Dep {
  static target: any = null;
  deps: any[];
  constructor() {
    this.deps = [];
  }
  getDeps() {
    if (!Dep.target || this.deps.includes(Dep.target)) return;
    console.log('依赖添加', Dep.target);
    this.deps.push(Dep.target);
  }
  notify() {
    this.deps.forEach((dep) => {
      dep();
    });
  }
}

const manObj = new Observer(man);

// console.log(man);
// console.log(manObj);

new Watcher(
  man,
  'strength',
  () => {
    let { height, weight } = man;
    if (height > 160 && weight > 70) return 'strong';
    return 'weak';
  },
  () => {
    console.log(`i am so ${man.strength}`);
  }
);

console.log(man.strength);
console.log(man.strength);

man.height = 161;
man.weight = 71;
