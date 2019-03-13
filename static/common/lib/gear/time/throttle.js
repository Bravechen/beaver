/**
 * 函数节流
 * @param {*} fn
 * @param {*} time
 */
function throttle(fn, time = 0) {
  let timer;
  let list = [];
  let context;

  let done = function() {
    clearTimeout(timer);
    timer = null;

    fn.apply(context, list);
    list = [];
    context = null;
  };

  return function(...args) {
    if (timer) {
      return;
    }
    list = args;
    context = this;

    timer = setTimeout(done, time);
  };
}

export default throttle;
