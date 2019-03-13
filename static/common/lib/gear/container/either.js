import isNoting from '../internal/isNothing.js';
import isFunction from '../internal/isFunction.js';
import isNull from '../internal/isNull.js';

/**
 * Either容器
 */
class Either {
  /**
   * @public
   * @static
   *
   * 接受一个值并返回新的容器
   * @param {any} value [opational] 值
   *
   * @return {Right | Left} 新的容器
   */
  static of(value) {
    return isNoting(value)
      ? new Left(value)
      : value.isLeft
        ? new Left(value._value)
        : new Right(value);
  }

  /**
   * @public
   * @static
   *
   * 返回一个承载错误信息的容器
   * @param {any} value [required] 错误值
   * @return {Left} 存放错误值的容器
   */
  static left(value) {
    return new Left(value);
  }

  /**
   * @public
   * @static
   *
   * 返回一个存放正确值的容器
   * @param {any} value [required] 正确的值
   */
  static right(value) {
    return new Right(value);
  }
}

/**
 * 处理错误值的错误容器
 */
class Left {
  constructor(value) {
    this._value = value;
  }
  /**
   * @public
   * @param {Function} fn [optional] 映射函数
   * 应用函数返回新的容器
   * 在错误容器中，不进行映射，直接返回新的错误容器
   *
   * @return {Left} 错误容器
   */
  map() {
    return new Left(this._value);
  }

  /**
   * @public
   * 返回容器中的值
   */
  get value() {
    return this._value;
  }

  /**
   * @public
   * 剥离容器外壳，返回其中真正的值
   * @return {any}
   */
  join() {
    return this._value;
  }

  /**
   * @public
   * 将处理错误值的函数应用到
   * 错误容器中的值，以便处理
   * @param {*} fn [required] 处理错误的函数
   */
  orElse(fn) {
    return isFunction(fn)
      ? fn(this._value)
      : Either.Left({
          message: `Expect the orElse()'s param is a function, not the ${
            isNull(fn) ? 'null' : typeof fn
          }.`
        });
  }

  /**
   * 是否是错误容器
   */
  get isLeft() {
    return true;
  }
}

/**
 * 处理合法值的正确容器
 */
class Right {
  constructor(value) {
    this._value = value;
  }

  /**
   * @public
   * @param {Function} fn [required] 映射函数
   * 应用函数返回新的容器
   *
   * @return {Left} 正确容器
   */
  map(fn) {
    return isFunction(fn)
      ? Either.of(fn(this._value))
      : Either.Left({
          message: `Expect the map()'s param is a function, not the ${
            isNull(fn) ? 'null' : typeof fn
          }.`
        });
  }

  /**
   * @public
   * 剥离容器外壳，返回其中真正的值
   * @return {any}
   */
  join() {
    if (
      !this ||
      (!(this.isRight instanceof Right) && !(this._value instanceof Left))
    ) {
      return this;
    }

    return this._value.join();
  }

  /**
   * @public
   * 返回容器中的值
   */
  get value() {
    return this._value;
  }

  /**
   * @public
   * 将处理错误值的函数应用到
   * 错误容器中的值，以便处理
   * 在正确容器中不会进行任何操作，直接返回容器本身
   * @param {*} fn [optional] 处理错误的函数
   */
  orElse() {
    return this;
  }

  /**
   * 是否是正确容器
   */
  get isRight() {
    return true;
  }
}

export default Either;
