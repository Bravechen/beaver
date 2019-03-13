var express = require('express');
var router = express.Router();

const os = require('os');

console.log('home dir==>', os.homedir(), '\n', os.tmpdir());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./pages/home/index', { title: 'Beaver'});
});

module.exports = router;
