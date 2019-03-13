import { _ } from '../internal/common.js';

function partial(fn, ...rest1) {
  if (typeof fn !== 'function') {
    return fn;
  }
  let postion = 0;

  return function(...rest2) {
    let args = [];
    for (let value of rest1) {
      args[args.length] = value && value === _ ? rest2[postion++] : value;
    }

    if (postion < rest2.length) {
      args = args.concat(rest2.slice(postion));
    }

    return fn.apply(this, args);
  };
}

export default partial;
