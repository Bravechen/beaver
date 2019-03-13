const fs = require('hexo-fs');
const isDirExit = require('./isDirExit');

function creat(path) {
  return new Promise(function(resolve, reject){
    fs.mkdirs(path, function(err) {
      if (err) {
        console.error(err);
        return reject(false);
      }

      return resolve(true);
    });
  });
}

async function createDir(path) {
  let isExit = await isDirExit(path);
  if (isExit) {
    return Promise.resolve(true);
  }
  return await creat(path);
}

module.exports = createDir;
