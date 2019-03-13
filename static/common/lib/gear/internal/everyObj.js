import noop from './noop.js';

function everyObj(list = {}, fn = noop, scope = null) {
  let keys = Object.keys(list);
  let index = -1;
  let len = keys.length;
  let result = true;
  while (++index < len) {
    let key = keys[index];
    result = fn.apply(scope, [list[key], key, list]);
    if (!result) {
      return false;
    }
  }
  return true;
}

export default everyObj;
