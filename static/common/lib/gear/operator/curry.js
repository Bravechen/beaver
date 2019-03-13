let curry = function(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('The param of curry should be expected function type.');
  }

  let len = fn.length;
  let o = function o(params) {
    return function(...args) {
      let ary = params.concat(args);
      if (ary.length >= len) {
        return fn.apply(this, ary);
      }

      return o(ary);
    };
  };

  return o([]);
};

export default curry;
