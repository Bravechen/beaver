const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('./pages/projects/config', {
    title: '项目配置'
  });
});

router.get('/controler', function(req, res, next) {
  res.render('./pages/projects/controler', {
    title: '项目控制'
  });
});

module.exports = router;
