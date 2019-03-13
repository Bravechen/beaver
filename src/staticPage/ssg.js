const Request = require('../lib/http/Request');
const wirteFile = require('../lib/fs/writeFile');

function requestPageData(path) {
  console.log('loading...');
  return Request.get(path, {})
    .then(res => {
      // console.log("11111111111111111", res);
      return res;
    })
    .catch(err => {
      console.error(err);
    });
}

module.exports = async function(pagePath, destPath) {
  console.log(pagePath, destPath);
  let data = await requestPageData(pagePath);
  console.log(data);
  let result = await wirteFile(destPath, `index.html`, data);
  if (!result) {
    return Promise.reject(result);
  }
  return Promise.resolve();
}
