const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('./pages/projects/config', {
    title: '项目配置',
    layout: 'layout'
  });
});

module.exports = router;
