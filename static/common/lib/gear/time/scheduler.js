/**
 * 延迟函数
 */
import { _ } from '../internal/common.js';
import partial from '../operator/partial.js';
import bind from '../operator/bind.js';

const scheduler = (function() {
  const delayFn = bind(setTimeout, void 0, _, _);

  return {
    delay5: partial(delayFn, _, 5000),
    delay10: partial(delayFn, _, 10000),
    delay: partial(delayFn, _, _)
  };
})();

export default scheduler;
