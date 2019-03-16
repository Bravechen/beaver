const fs = require('hexo-fs');
const isDirExit = require('./isExist');

function removeDir(path) {
  return new Promise(function(resolve, reject) {
    fs.rmdir(path, function(err) {
      if (err) {
        console.error(err);
        return reject(false);
      }

      return resolve(true);
    });
  });
}

async function deleteDir(path) {
  let isExit = await isDirExit(path);

  if (!isExit) {
    return Promise.resolve(true);
  }

  return await removeDir(path);
}

module.exports = deleteDir;
