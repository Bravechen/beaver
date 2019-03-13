/**
 * gear函数式编程库
 *
 * @author Brave Chan on 2018
 * @version 0.1.0
 */
//=========================================================
import tempGear from './internal/tempGear.js';
import { _ } from './internal/common.js';

import alt from './operator/alt.js';
import bind from './operator/bind.js';
import curry from './operator/curry.js';
import every from './operator/every.js';
import filter from './operator/filter.js';
import fork from './operator/fork.js';
import identity from './operator/identity.js';
import map from './operator/map.js';
import partial from './operator/partial.js';
import reduce from './operator/reduce.js';
import reduceRight from './operator/reduceRight.js';
import revers from './operator/revers.js';
import seq from './operator/seq.js';
import some from './operator/some.js';
import tap from './operator/tap.js';
import value from './operator/value.js';

import compose from './control/compose.js';
import pipe from './control/pipe.js';

import Tuple from './structure/Tuple.js';

import Either from './container/either.js';
import IO from './container/io.js';
import Maybe from './container/maybe.js';
import Functor from './container/Functor.js';

import debounce from './time/debounce.js';
import scheduler from './time/scheduler.js';
import throttle from './time/throttle.js';

let chainableObj = {};

chainableObj.chain = chain;
chainableObj.map = map;
chainableObj.filter = filter;
chainableObj.revers = revers;
chainableObj.tap = tap;
chainableObj.identity = identity;
chainableObj.value = value;

function chain(data) {
  if (!data) {
    return;
  }
  let obj = createGear(data);
  obj.__chain__ = true;
  return obj;
}

tempGear.__tempGear__ = tempGear.combineChainable(
  chainableObj,
  tempGear.creatTempGear()
);

function createGear(data) {
  let obj = Object.assign({}, tempGear.__tempGear__);
  obj.__value__ = data;
  return obj;
}

function gear(value) {
  return chain(value);
}

gear.alt = alt;
gear.bind = bind;
gear.curry = curry;
gear.chain = chain;
gear.every = every;
gear.filter = filter;
gear.fork = fork;
gear.identity = identity;
gear.map = map;
gear.partial = partial;
gear.reduce = reduce;
gear.reduceRight = reduceRight;
gear.revers = revers;
gear.seq = seq;
gear.some = some;
gear.tap = tap;
gear.value = value;

gear.compose = compose;
gear.pipe = pipe;

gear.Tuple = Tuple;
gear.Either = Either;
gear.IO = IO;
gear.Maybe = Maybe;

gear.debounce = debounce;
gear.throttle = throttle;
gear.scheduler = scheduler;
gear._ = _;

export {
  gear,
  _,
  //========================
  alt,
  bind,
  curry,
  every,
  filter,
  fork,
  identity,
  map,
  partial,
  reduce,
  reduceRight,
  revers,
  seq,
  some,
  tap,
  value,
  //========================
  compose,
  pipe,
  //========================
  Tuple,
  Either,
  IO,
  Maybe,
  Functor,
  //========================
  debounce,
  throttle,
  scheduler
};
