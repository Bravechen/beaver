let tempGear = {};

function combineChainable(gear, temp) {
  let keys = Object.keys(gear);
  let obj = Object.assign({}, temp);
  for (let value of keys) {
    obj[value] = function() {
      let useChain = this.__chain__ && value !== 'value';
      let params = Array.from(arguments);
      let fn = gear[value];

      if (useChain) {
        let actions = this.__actions__.slice(0);
        actions.push({
          fn,
          params
        });
        this.__actions__ = actions;
        return Object.assign({}, this);
      }

      return fn.apply(this, params);
    };
  }
  return obj;
}

function creatTempGear() {
  return {
    __chain__: false,
    __actions__: [],
    __value__: null
  };
}

const temp = {
  combineChainable,
  creatTempGear,
  set __tempGear__(value) {
    tempGear = value;
  },
  get __tempGear__() {
    return tempGear;
  }
};

export default temp;
