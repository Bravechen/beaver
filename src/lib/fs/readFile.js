const fs = require('hexo-fs');
const isExist = require('./isExist');

module.exports = async function(path) {
  let isPathExist = await isExist(path);

  if (!isPathExist) {
    return Promise.reject({
      message: 'path is not exist.'
    });
  }

  return await new Promise(function(resolve, reject) {
    fs.readFile(path, function(err, value) {
      if (err) {
        return reject(err);
      }

      return resolve(value);
    });
  });
};
