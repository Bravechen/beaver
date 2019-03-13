import noop from './noop.js';

function someAry(list = [], fn = noop, scope = null) {
  let index = 0;
  let len = list.length;
  let result = false;
  while (++index < len) {
    result = fn.apply(scope, [list[index], index, list]);
    if (result) {
      return true;
    }
  }
  return false;
}

export default someAry;
