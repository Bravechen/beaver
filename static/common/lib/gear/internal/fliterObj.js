import noop from './noop.js';

function filterObj(list = {}, fn = noop, scope = null) {
  let keys = Object.keys(list);
  let len = keys.length;
  let index = -1;
  let result = {};
  while (++index < len) {
    let key = keys[index];
    if (fn.apply(scope, [list[key], key, list])) {
      result[key] = list[key];
    }
  }

  return result;
}

export default filterObj;
