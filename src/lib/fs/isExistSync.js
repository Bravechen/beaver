const fs = require('fs');

module.exports = function(path) {
  let isExist = true;
  try {
    isExist = fs.existsSync(path);
  } catch (error) {
    console.error(error);
    return false;
  }
  return isExist;
}