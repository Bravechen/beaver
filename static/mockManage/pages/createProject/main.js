import { getChildrenDOM, addChildrenEvents, addEvent } from '../../common/utils/children.js';
import { Maybe, Functor, curry, tap } from '../../../common/lib/gear/gear.js';

let vo = {
  data: {
    proDirPath: '',
    proTempDirPath: '',
    proDecDirPath: '',
    targetPageType: '',
    mockProName: '',
    mockProDirPath: ''
  },
  children: {
    projectDir: 'projectDir',
    projectTempDir: 'projectTempDir',
    projectDecorateDir: 'projectDecorateDir',
    targetPageType: 'targetPageType',
    mockProName: 'mockProName',
    mockProDir: 'mockProDir',
    createPro: 'createPro'
  },
  childrenEvents: [
    ['projectDir', 'change', onProDirChange],
    ['projectTempDir', 'change', onProTempDirChange],
    ['projectDecorateDir', 'change', onProDecDirChange],
    ['targetPageType', 'change', onTargetPageTypeChange],
    ['mockProName', 'change', onMockProNameChange],
    ['mockProDir', 'change', onMockProDirChange],
    ['createPro', 'click', onCreateProClick]
  ]
};

function init() {
  window.addEventListener('DOMContentLoaded', onDocReady);
}

function onDocReady() {
  window.removeEventListener('DOMContentLoaded', onDocReady);

  vo.children = Maybe.of(vo.children)
                  .map(createChildren)
                  .map(childrenCreated)
                  .join();
}

function createChildren(children) {

  return Functor.of(children)
          .map(getChildrenDOM)
          .map(tap(function(obj) {
            console.log(obj);
          }))
          .value();
}

function childrenCreated(children) {

  return Functor.of(children)
          .map(curry(addChildrenEvents)(vo.childrenEvents, addEvent))
          .value();
}

//====================================================
function onProDirChange(e) {
  console.log('project dir change====>>', e.target.value);
  vo.data.proDirPath = e.target.value;
}

function onProTempDirChange(e) {
  console.log('project temp dir change====>>', e.target.value);
  vo.data.proTempDirPath = e.target.value;
}

function onProDecDirChange(e) {
  console.log('project decorate dir change====>>', e.target.value);
  vo.data.proDecDirPath = e.target.value;
}

function onTargetPageTypeChange(e) {
  console.log('target page type change====>>', e, e.target.value);
  vo.data.targetPageType = e.target.value;
}

function onMockProNameChange(e) {
  console.log('mock project name change====>>', e.target.value);
  vo.data.mockProName = e.target.value;
}

function onMockProDirChange(e) {
  console.log('mock project dir change====>>', e.target.value);
  vo.data.mockProDirPath = e.target.value;
}

function onCreateProClick(e) {
  console.log(vo.data);
}

//====================================================
init();
