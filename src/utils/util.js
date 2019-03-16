
function getSysId() {
  return `${randomStr()}-${randomStr()}`;
}

function randomStr() {
  return (0xffffff * Math.random()).toString(16).replace(/\./, '');
}

module.exports = {
  getSysId,
  randomStr
};
