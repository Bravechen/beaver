const fs = require('hexo-fs');
const createDir = require('./createDir');

module.exports = async function(dir, fileName, data) {
  let result = await createDir(dir);
  if (!result) {
    return Promise.reject(result);
  }

  return new Promise(function(resolve, reject) {
    fs.writeFile(
      `${dir}\\${fileName}`,
      data,
      { encoding: 'utf8' },
      function(err) {
        if (err) {
          console.error(err);
          return reject(false);
        }
        return resolve(true);
      }
    );
  });
};
