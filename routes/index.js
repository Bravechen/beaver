const express = require('express');
const router = express.Router();
const path = require('path');
const readFile = require('../src/lib/fs/readFile');

/* GET home page. */
router.get('/', function(req, res, next) {
  let configPath = path.resolve(__dirname, '../config/workplace.config.json');
  readFile(configPath)
    .then(function(data) {
      let wpsConfig = JSON.parse(data);
      let wpList = Object.keys(wpsConfig)
                    .reduce(function(prev, item) {
                      prev.push(wpsConfig[item]);
                      return prev;
                    }, []);
      res.render('./pages/home/index', { title: 'Beaver', wpList: wpList});
    })
    .catch(function(err) {
      console.error('init wpsConfig opt failed===>>>', err);
      res.render('./pages/home/index', { title: 'Beaver'});
      return err;
    });

});

module.exports = router;
