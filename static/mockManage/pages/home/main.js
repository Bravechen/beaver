
import { gainProjects } from './services/DataService.js';
import { Maybe, Functor } from '../../../common/lib/gear/gear.js';
import { getChildrenDOM, insterMsg } from '../../common/utils/children.js';
// =================================
let vo = {
  projectList: [],
  children: {
    projects: 'projects',
    msgBox: 'msgBox'
  }
};
// =================================
function init() {
  window.addEventListener('DOMContentLoaded', onDocReady);
}

function onDocReady() {
  window.removeEventListener('DOMContentLoaded', onDocReady);
  vo.children = Maybe.of(vo.children)
    .map(createChildren)
    .map(childrenCreated)
    .value();
}

function createChildren(children) {

  return Functor.of(children)
    .map(getChildrenDOM)
    .value();
}

function childrenCreated(children) {

  return children;
}

async function loadProjects() {
  let msg = await gainProjects();
  if (msg.isError) {
    return insterMsg(vo.children.msgBox, msg.message);
  }

  return insterMsg(vo.children.msgBox, '请求成功');
}


// =================================
init();
