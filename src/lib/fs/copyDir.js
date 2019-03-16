let fs = require('hexo-fs');
const isDirExit = require('./isExist');

function copy(src, dest, opt = {}) {
  return new Promise(function(resolve, reject) {
    fs.copyDir(src, dest, opt, function(err) {
      if (err) {
        console.error('In copyDir error====>>>', err);
        return reject(err);
      }

      return resolve(true);
    });
  });
}

function allExit(src, dest) {
  return Promise.all([isDirExit(src), isDirExit(dest)]);
}

async function copyDir(src, dest, opt = {}) {
  let exit = await allExit(src, dest);
  if (!exit) {
    console.log(
      'In copyDir, some path is not exit===>src:',
      src,
      '\n',
      `dest: ${dest}`
    );
    return Promise.reject(false);
  }

  return await copy(src, dest, opt);
}

module.exports = copyDir;
