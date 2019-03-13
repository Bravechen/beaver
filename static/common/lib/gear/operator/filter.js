import isObject from '../internal/isObject.js';
import isArray from '../internal/isArray.js';
import filterObj from '../internal/fliterObj.js';
import filterAry from '../internal/filterAry.js';

function filter(list, fn) {
  if (!list || typeof fn !== 'function') {
    return list;
  }

  return isObject(list)
    ? filterObj(list, fn)
    : isArray(list)
      ? filterAry(list, fn)
      : list;
}

export default filter;
