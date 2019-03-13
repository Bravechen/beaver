/**
 * 函数防抖
 * @param {*} fn
 * @param {*} time
 */
function debounce(fn, time = 0) {
  let timer;
  let list = [];
  let context;

  let done = function() {
    clearTimeout(timer);
    timer = null;

    fn.apply(context, list);
    list = [];
  };

  return function(...args) {
    context = this;
    list = args;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(done, time);
  };
}

export default debounce;
