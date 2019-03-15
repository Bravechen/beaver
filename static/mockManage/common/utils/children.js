import { pipe, curry } from '../../../common/lib/gear/gear.js';
/**
 * 用id获取元素
 * @param {*} id
 */
function getElById(id) {
  return document.getElementById(id);
}

/**
 * 将子元素存储到集合
 * @param {*} el
 * @param {*} key
 * @param {*} children
 */
function saveChild(el, key, children) {
  return Object.assign({}, children, {[key]: el});
}

/**
 * 从子元素集合中获取元素
 * @param {*} key
 * @param {*} children
 */
function getChild(key, children) {
  return children[key];
}

/**
 * 根据子对象集合获取dom中的子对象节点
 * @param {*} children
 */
function getChildrenDOM(children) {
  let getEl = pipe(getElById, curry(saveChild));
  return Object.keys(children)
          .reduce(function(prev, item) {
            return getEl(item)(item, prev);
          }, children);
}

/**
 * 给元素添加事件
 * @param {*} el
 * @param {*} eventType
 * @param {*} handler
 */
function addEvent(eventType, handler, el ) {
  el.addEventListener(eventType, handler);
  return el;
}

/**
 * 为子对象添加事件
 * @param {*} childrenEvents
 * @param {*} addEvent
 * @param {*} children
 */
function addChildrenEvents(childrenEvents, addEvent, children) {
  return childrenEvents.reduce(
    function(prev, item) {
      let el = item[0];
      addEvent(item[1], item[2], prev[el]);
      return prev;
    },
    children
  );
}

function insterMsg(box, msg) {
  let txtNode = document.createTextNode(msg);
  let p = document.createElement('p');
  p.appendChild(txtNode);
  box.appendChild(p);
  return box;
}

export {
  getElById,
  saveChild,
  getChild,
  addEvent,
  addChildrenEvents,
  insterMsg,
  getChildrenDOM
};
