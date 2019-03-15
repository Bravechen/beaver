import Request from '../../../common/lib/request/AjaxRequest.js';
import HU from '../../utils/HttpUtil.js';

import {
  Functor,
  Maybe,
  partial,
  pipe,
  curry,
  identity,
  tap,
  _
} from '../../../common/lib/gear/gear.js';

import {
  insterMsg,
  getChildrenDOM,
  addEvent,
  addChildrenEvents
} from '../../common/utils/children.js';

let vo = {
  data: {
    wpName: '',
    wpPath: '',
    wpList: []
  },
  children: {
    wpName: 'wpName',
    wpPath: 'wpPath',
    createBtn: 'createBtn',
    msgBox: 'msgBox'
  },
  childrenEvents: [
    ['createBtn', 'click', onCreateWpClick],
    ['wpName', 'change', onWpNameChange],
    ['wpPath', 'change', onWpPathChange]
  ]
};

// ====================================

function init() {
  window.addEventListener('DOMContentLoaded', onDocReady);
}

/**
 * doc准备完毕
 */
function onDocReady() {
  window.removeEventListener('DOMContentLoaded', onDocReady);
  vo.children = Functor.of(vo.children)
    .map(createChildren)
    .map(childrenCreated)
    .value();
}

/**
 * 创建子对象集合
 * @param {*} children
 */
function createChildren(children = {}) {
  // let getEl = pipe(getElById, curry(saveChild));
  return Object.assign(
    {},
    children,
    Maybe.of(children)
      .map(getChildrenDOM)
      .map(tap(function(obj) {
        console.log(obj);
      }))
      .value()
  );
}

/**
 * 子对象集合创建完毕
 * @param {*} children
 */
function childrenCreated(children = {}) {
  return Functor.of(children)
    .map(curry(addChildrenEvents)(vo.childrenEvents, addEvent))
    .value();
}

// ====================================
async function onCreateWpClick(e) {
  if (!vo.wpName || !vo.wpPath) {
    return;
  }
  console.log(`createWp ${e.type}`, e.target, e.currentTarget);

  let msg = await Request.post(HU.CREATE_WORKPLACE, {
    wpName: vo.wpName,
    wpPath: vo.wpPath
  })
  .then(function(res) {
    console.log(res);
    return '请求成功!';
  })
  .catch(function(err) {
    console.error(err);
    return '请求失败!';
  });
  insterMsg(vo.children.msgBox, msg);
}

function onWpNameChange(e) {
  console.log(`wpName ${e.type}`, e.target, e.currentTarget);
  let input = e.target;
  vo.wpName = input.value;
}

function onWpPathChange(e) {
  console.log(`wpPath ${e.type}`, e.target, e.currentTarget);
  let input = e.target;
  vo.wpPath = input.value;
}

// ====================================
init();
