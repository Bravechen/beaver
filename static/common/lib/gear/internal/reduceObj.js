import noop from './noop.js';
import isNot from './isNot.js';

function reduceObj(list = {}, fn = noop, accumulator, scope = null) {
  let keys = Object.keys(list);
  let index = -1;
  let len = keys.length;

  if (isNot(accumulator) && len > 0) {
    accumulator = list[keys[++index]];
  }

  while (++index < len) {
    let key = keys[index];
    accumulator = fn.apply(scope, [accumulator, list[key], key, list]);
  }

  return accumulator;
}

function reduceRightObj(list = {}, fn = noop, accumulator, scope = null) {
  let keys = Object.keys(list);
  let len = keys.length;

  if (isNot(accumulator) && len > 0) {
    len--;
    accumulator = list[keys[len]];
  }

  while (len--) {
    let key = keys[len];
    accumulator = fn.apply(scope, [accumulator, list[key], key, list]);
  }
  return accumulator;
}

export { reduceObj, reduceRightObj };
