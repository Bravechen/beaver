let pipe = function(...args) {
  let fnList = args;
  return function(...args) {
    let result = args;
    let len = fnList.length;
    let i = -1;
    while (++i < len) {
      let fn = fnList[i];
      if (typeof fn === 'function') {
        result = fn.apply(this, result);
        result = [result];
      }
    }
    return result[0];
  }
}

export default pipe;
