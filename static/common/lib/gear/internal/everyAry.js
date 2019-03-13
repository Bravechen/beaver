import noop from './noop.js';

function everyAry(list = [], fn = noop, scope = null) {
  let index = -1;
  let len = list.length;
  let result = true;
  while (++index < len) {
    result = fn.apply(scope, [list[index], index, list]);
    if (!result) {
      return false;
    }
  }
  return true;
}

export default everyAry;
