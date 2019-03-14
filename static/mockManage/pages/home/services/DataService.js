import HU from '../../../utils/HttpUtil.js';
import Request from '../../../../common/lib/request/AjaxRequest.js';

async function gainProjects() {
  return await Request.get(HU.GET_WP_List)
    .then(function(res) {
      let canUse = res && res.resCode === 200 && res.data;
      if (!canUse) {
        console.error(res);
        return {
          isError: true,
          message: '请求失败'
        };
      }

      return res.data;
    })
    .catch(function(err) {
      console.error(err);
      return {
        isError: true,
        message: '请求失败'
      }
    });
}

function createProList(list = []) {
  let ul = document.createElement('ul');
  let frag = document.createDocumentFragment();
  return list.reduce(function(prev, item, index) {
    ul.innerHTML = projectItemStr(item);
    prev.appendChild(ul.firstChild());
    return prev;
  }, frag);
}

function projectItemStr(data = {}) {
  return `
  <li>
    <span>${data.name}</span>
    <div>
      <a data-wpId="${data.id}" href="javascript: void 0">设为默认工作区</a>
      <a data-wpId="${data.id}" href="javascript: void 0">取消默认</a>
      <a data-wpId="${data.id}" href="javascript: void 0">修改工作区配置</a>
      <a data-wpId="${data.id}" href="javascript: void 0">删除工作区</a>
    </div>
  </li>
  `;
}

export {
  gainProjects
};
