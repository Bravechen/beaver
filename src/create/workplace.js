const readFile = require('../lib/fs/readFile');
const _ = require('lodash');
const Either = require('../lib/fn/container/either');
const path = require('path');
const { getSysId } = require('../utils/util');
//===========================================================
const configPath = path.resolve(process.cwd, '/config/workplace.config.json');
const paramsError = {
  resCode: 400,
  data: {
    resCode: 400,
    data: {
      message: 'params error.'
    }
  }
};
const success = {
  resCode: 200,
  data: {
    resCode: 200
  }
};

//===========================================================

function loadConfig(path) {
  return readFile(path)
    .then(function(data) {
      return JSON.parse(data);
    })
    .catch(function(err) {
      console.error('read config file failed.');
      return null;
    })
}

function validateParam(data) {
  return data.wpName && data.wpPath
}

function saveWpConfig(wpsConfig, config) {
  wpsConfig[config.id] = config;

  return {};
}

function checkRes(data) {
  if (data.err) {
    return Either.left(data.err);
  }
  return Either.right(data);
}


//===========================================================
module.exports = async function(wpName = '', wpPath = '') {
  console.log('handle create work place', wpName, wpPath, __dirname, process.cwd());
  let saveFn = _.curry(saveWpConfig)({ name: wpName, path: wpPath, id: getSysId() });
  return Either.of(
    validateParam({ wpName, wpPath })
      ? (await loadConfig(configPath))
      : {isLeft: true,err: paramsError}
  )
  .map(saveFn)
  .map(checkRes)
  .join();
};
