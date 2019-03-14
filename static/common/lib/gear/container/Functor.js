import isFunction from '../internal/isFunction.js';
/**
 * 函子
 */
class Functor {
  constructor(value) {
    this._value = value;
  }

  static of(value) {
    return new Functor(value);
  }

  map(fn) {
    if (!isFunction) {
      throw new Error('In function map(),except the type of param must be Function, but not.');
    }
    return new Functor(fn(this._value));
  }

  value() {
    return this._value;
  }
}

export default Functor;
