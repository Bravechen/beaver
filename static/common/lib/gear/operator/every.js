import isArray from '../internal/isArray.js';
import isObject from '../internal/isObject.js';
import everyAry from '../internal/everyAry.js';
import everyObj from '../internal/everyObj.js';

function every(list, fn) {
  if (!list || typeof fn === 'function') {
    return false;
  }

  return isObject(list)
    ? everyObj(list)
    : isArray(list)
      ? everyAry(list)
      : false;
}

export default every;
