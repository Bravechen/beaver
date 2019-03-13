import noop from './noop.js';

function filterAry(list = [], fn = noop, scope = null) {
  let len = list.length;
  let index = -1;
  let result = [];
  while (++index < len) {
    let item = list[index];
    if (fn.apply(scope, [item, index, list])) {
      result.push(item);
    }
  }

  return result;
}

export default filterAry;
