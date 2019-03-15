const isNoting = require('../internal/isNothing.js');
const isFunction = require('../internal/isFunction.js');

class Maybe {
  constructor(value) {
    this._value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  map(fn) {
    return isFunction(fn)
      ? isNothing(this._value)
        ? Maybe.of(null)
        : Maybe.of(fn(this._value))
      : Maybe.of(this._value);
  }

  join() {
    if (!(this._value instanceof Maybe)) {
      return this;
    }

    return this._value.join();
  }

  value() {
    return this._value;
  }
}

module.exports = Maybe;
