import noop from './noop.js';

function _mapAry(ary = [], fn = noop, scope = null) {
  let len = ary.length;
  let index = -1;
  let result = [];
  while (++index < len) {
    result[index] = fn.apply(scope, [ary[index], index, ary]);
  }
  return result;
}

export default _mapAry;
