import noop from './noop.js';

function someObj(list = {}, fn = noop, scope = null) {
  let keys = Object.keys(list);
  let index = 0;
  let len = keys.length;
  let result = false;
  while (++index < len) {
    let key = keys[index];
    result = fn.apply(scope, [list[key], key, list]);
    if (result) {
      return true;
    }
  }
  return false;
}

export default someObj;
