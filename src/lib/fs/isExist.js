const fs = require('hexo-fs');

function isPathExist(path) {
  return new Promise(function(resolve, reject) {
    fs.exists(path, function(isExist) {
      if (!isExist) {
        return reject(false);
      }
      return resolve(true);
    });
  });
}

module.exports = isPathExist;
