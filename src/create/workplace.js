const readFile = require('../lib/fs/readFile');
const writeFile = require('../lib/fs/writeFile');
const isExistSync = require('../lib/fs/isExistSync');
const _ = require('lodash');
const Either = require('../lib/fn/container/either');
const path = require('path');
const { getSysId } = require('../utils/util');
const { createWPConfig, createNPMConfig } = require('../template/config/workplace.temp');
//===========================================================
const configPath = path.resolve(process.cwd(), './config/workplace.config.json');
const configDir = path.resolve(process.cwd(), './config/');
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

const pathNotExist = {
  resCode: 200,
  data: {
    resCode: 404,
    data: {
      message: 'wpPath is not exist.'
    }
  }
};

const createFileErr = {
  resCode: 200,
  data: {
    resCode: 500,
    data: {
      message: 'create wp config files failed.'
    }
  }
}

//===========================================================

function loadConfig(path) {
  return readFile(path)
    .then(function(data) {
      return JSON.parse(data);
    })
    .catch(function(err) {
      console.error('read config file failed.', err);
      return Either.left({
        resCode: 500,
        data: {
          resCode: 500,
          data: 'read config file failed.'
        }
      });
    })
}

function validateParam(data) {
  return data.wpName && data.wpPath
}

function saveWpConfig(wpsConfig, config) {
  wpsConfig[config.id] = config;
  writeFile(configDir, 'workplace.config.json', JSON.stringify(wpsConfig, 2));
  return config;
}

function checkWpDir(wpsConfig, config) {
  let wpPath = config.path;
  if (!isExistSync(wpPath)) {
    return Either.left(pathNotExist);
  }
  return wpsConfig;
}

async function createWpFiles(config) {
  let wpPath = config.path;
  let packageJson = createNPMConfig(config.name);
  let wpFile = JSON.stringify(createWPConfig(), 2);
  let ok = await writeFile(wpPath, 'package.json', packageJson);
  if (!ok) {
    return Promise.resolve(createFileErr);
  }
  ok = await writeFile(wpPath, 'workplace.config.json', wpFile);
  if (!ok) {
    return Promise.resolve(createFileErr);
  } 

  return Promise.resolve(success);
}

function checkRes(data) {
  console.log('back data', data);
  return data;
}


//===========================================================
module.exports = async function(wpName = '', wpPath = '') {
  console.log('handle create work place', wpName, wpPath, __dirname, process.cwd());
  let config = { name: wpName, path: wpPath, id: getSysId() };
  return await Either.of(
    validateParam({ wpName, wpPath })
      ? (await loadConfig(configPath))
      : Either.left(paramsError)
  )
  .map(_.curry(checkWpDir)(_, config))
  .map(_.curry(saveWpConfig)(_, config))  
  .map(createWpFiles)
  .map(checkRes)
  .join()
  .value;
};
