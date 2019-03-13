function value() {
  let useChain = this && this.__chain__;

  if (useChain) {
    let execList = this.__actions__;
    let result = this.__value__;
    for (let value of execList) {
      if (!value) {
        continue;
      }
      result = value.fn.apply(this, [result].concat(value.params));
    }

    return result;
  }

  return this && this._value ? this._value : void 0;
}

export default value;
