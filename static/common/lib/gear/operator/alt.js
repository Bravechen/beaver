function alt(fn1, fn2) {
  return function(value) {
    return (
      (typeof fn1 === 'function' && fn1(value)) ||
      (typeof fn2 === 'function' && fn2(value))
    );
  };
}

export default alt;
