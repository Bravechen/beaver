import noop from '../internal/noop.js';

function seq(...fnList) {
  if (fnList.length <= 0) {
    return noop;
  }

  return function(value) {
    fnList.forEach(item => typeof item === 'function' && item(value));
  };
}

export default seq;
