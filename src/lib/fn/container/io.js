const isFunction = require('../internal/isFunction.js');

class IO {
  constructor(fn) {
    if (!isFunction(fn)) {
      throw new Error('IO Usage: function required!');
    }

    this.effect = fn;
  }

  static of(value) {
    return new IO(() => value);
  }

  static from(fn) {
    return new IO(fn);
  }

  map(fn) {
    if (!isFunction(fn)) {
      return new IO(this.effect);
    }

    return new IO(fn(this.effect()));
  }

  run() {
    return this.effect();
  }
}

module.exports = IO;
