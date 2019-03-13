import noop from './noop.js';
import isNot from './isNot.js';

function reduceAry(list = [], fn = noop, accumulator, scope = null) {
  let index = -1;
  let len = list.length;

  if (isNot(accumulator) && len > 0) {
    accumulator = list[++index];
  }

  while (++index < len) {
    accumulator = fn.apply(scope, [accumulator, list[index], index, list]);
  }

  return accumulator;
}

function reduceRightAry(list = [], fn = noop, accumulator, scope = null) {
  let len = list.length;

  if (isNot(accumulator) && len > 0) {
    len--;
    accumulator = list[len];
  }

  while (len--) {
    accumulator = fn.apply(scope, [accumulator, list[len], len, list]);
  }
  return accumulator;
}

export { reduceAry, reduceRightAry };
