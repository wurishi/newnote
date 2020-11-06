const obj = {
  _arr: [1, 2],

  print() {
    this._arr.forEach(v => console.log(v));
  },

  p2: () => {
    console.log(this._arr);
  }
};