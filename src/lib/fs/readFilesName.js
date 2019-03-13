const fs = require('hexo-fs');

function filesList(path) {
  return new Promise(function(resolve, reject) {
    fs.listDir(path, function(err, list) {
      if (err) {
        return reject(err);
      }

      return resolve(list);
    });
  });
}

module.exports = filesList;
