import isArray from '../internal/isArray.js';
import isObject from '../internal/isObject.js';
import someObj from '../internal/someObj.js';
import someAry from '../internal/someAry.js';

function some(list, fn, scope) {
  if (!list || typeof fn !== 'function') {
    return false;
  }

  return isObject(list)
    ? someObj(list, fn, scope)
    : isArray(list)
      ? someAry(list, fn, scope)
      : false;
}

export default some;
