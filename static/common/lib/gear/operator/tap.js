function tap(fn) {
  return function(param) {
    if (typeof fn === 'function') {
      fn.call(this, param);
    }
    return param;
  };
}

export default tap;
