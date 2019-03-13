const fs = require('hexo-fs');

function isDirExit(path) {
  return new Promise(function(resolve) {
    fs.exists(path, function(isExit) {
      console.log("@@@@@@---->", isExit);
      return resolve(isExit);
    });
  });
}

module.exports = isDirExit;
