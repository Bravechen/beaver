var express = require('express');
var router = express.Router();

router.get('/workplace', function(req, res, next) {
  res.render('./pages/create/workplace', {
    title: 'create workplace',
    layout: 'layout'
  });
});

router.get('/project', function(req, res, next) {
  res.render('./pages/create/project', {
    title: 'create project',
    layout: 'layout'
  });
});

module.exports = router;
