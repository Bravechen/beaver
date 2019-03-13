import isObject from '../internal/isObject.js';
import isArray from '../internal/isArray.js';
import _mapObj from '../internal/mapObj.js';
import _mapAry from '../internal/mapAry.js';

let map = function(list, fn, scope) {
  if (typeof fn !== 'function') {
    return list;
  }

  return isObject(list)
    ? _mapObj(list, fn, scope)
    : isArray(list)
      ? _mapAry(list, fn, scope)
      : list;
};

export default map;
