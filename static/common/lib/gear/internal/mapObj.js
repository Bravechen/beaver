import noop from './noop.js';

function _mapObj(obj = {}, fn = noop, scope = null) {
  let keys = Object.keys(obj);
  let len = keys.length;
  let index = -1;
  let result = {};
  while (++index < len) {
    let key = keys[index];
    result[key] = fn.apply(scope, [obj[key], key, obj]);
  }
  return result;
}

export default _mapObj;
