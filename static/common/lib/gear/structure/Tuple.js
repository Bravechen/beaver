import isNull from '../internal/isNull.js';
import isUndefined from '../internal/isUndefined.js';

class _Tuple {
  constructor(types, values) {
    let index = values.length;

    if (values.some(item => isNull(item) || isUndefined(item))) {
      throw new ReferenceError('Tuples may not have any null values.');
    }

    if (values.length !== types.length) {
      throw new TypeError('Tuples arity does not match its prototype.');
    }

    while (--index >= 0) {
      this[`_${index + 1}`] = checkType(types[index])(values[index]);
    }

    Object.freeze(this);
  }

  values() {
    return Object.keys(this).map(item => this[item]);
  }
}

function checkType(Type) {
  const cache = new WeakMap();
  if (cache.has(Type)) {
    return cache.get(Type);
  }

  cache.set(Type, function(value) {
    return new value.constructor() instanceof Type ? value : void 0;
  });

  return cache.get(Type);
}

function Tuple(...types) {
  if (
    types.some(
      item => typeof item !== 'function' || item.prototype.constructor !== item
    )
  ) {
    throw new TypeError('The parameter type of a tuple must be a constructor.');
  }

  return function(...values) {
    return new _Tuple(types, values);
  };
}

export default Tuple;
