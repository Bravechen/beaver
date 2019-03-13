
/**
 * post请求
 * @param {String} url 请求地址
 * @param {Object} data 参数
 * @param {Function} handler 回调函数
 */
function post(url, data, handler) {

  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open('post', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // very important

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
              let data = JSON.parse(xhr.responseText);
              if (typeof handler === 'function') {
                handler(null, data);
              }
              return resolve(data);
            } else {
              let err = {
                message: '注意',
                detail: `加载数据失败 status: ${xhr.status}`
              };
              if (typeof handler === 'function') {
                handler(err);
              }
              return reject(err);
            }
        }
    };

    //序列化 very important
    var str = [];
    for ( var key in data) {
        if (data.hasOwnProperty(key)) {
          str[str.length] = key + "=" + data[key];
        }
    }
    str = str.join('&');

    // console.log("send data==================>",str);
    //发送数据
    xhr.send(str);
  });
}

/**
 * get请求
 * @param {*} url
 * @param {*} data
 * @param {*} handler
 */
function get(url, data, handler) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open('get', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
              let data = JSON.parse(xhr.responseText);
              if (typeof handler === 'function') {
                handler(null, data);
              }
              return resolve(data);
            } else {
              let err = {
                message: '注意',
                detail: '加载数据失败' + xhr.status
              };
              if (typeof handler === 'function') {
                handler(err);
              }
              return reject(err);
            }
        }
    };

    //序列化 very important
    var str = [];
    for ( var key in data) {
        if (data.hasOwnProperty(key)) {
          str[str.length] = key + "=" + data[key];
        }
    }
    str = str.join('&');

    // console.log("send data==================>",str);
    //发送数据
    xhr.send(str);
  });
}

export default {
  post,
  get
};
