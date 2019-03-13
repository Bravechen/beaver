import noop from '../internal/noop.js';

function fork(joinFn, fn1, fn2) {
  let join = typeof joinFn === 'function' ? joinFn : noop;
  fn1 = typeof fn1 === 'function' ? fn1 : noop;
  fn2 = typeof fn2 === 'function' ? fn2 : noop;

  return function(value) {
    return join(fn1(value), fn2(value));
  };
}

export default fork;
