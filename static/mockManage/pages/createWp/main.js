import { Functor, Maybe, partial, pipe, curry, identity } from '../../../common/lib/gear/gear.js';

function init() {
  window.addEventListener('DOMContentLoaded', onDocReady);
}

function onDocReady() {
  let children = {
    wpName: 'wpName',
    createBtn: 'createBtn'
  };
  let obj = Functor.of(children)
    .map(createChildren)
    .map(childrenCreated)
    .value();
}

function createChildren(children = {}) {
  let getEL = pipe(getElById, curry(saveChild));
  return Object.assign(
    {},
    children,
    Functor.of(children)
      .map(getEL(children.wpName)(children.wpName))
      .map(function(children) {
        console.log('get wpName?===>', children);
        return children;
      })
      .map(getEL(children.createBtn)(children.wpName))
      .map(function(children) {
        console.log('get createBtn?===>', children);
        return children;
      })
      .value()
  );
}

function childrenCreated(children = {}) {

  return children;
}

function getElById(id) {
  console.log(id);
  return document.getElementById(id);
}

function saveChild(el, key, children) {
  console.log(el, key, children);
  return Object.assign({}, children, {[key]: el});
}

function addEvent(el = {}, eventType = '', handler = error('handler must be a function')) {
  el.addEventListener(eventType, handler);
}

function error(msg) {
  return function(msg) {
    console.error(msg);
  }
}

init();
