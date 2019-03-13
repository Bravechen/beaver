var express = require('express');
var router = express.Router();

router.get('/workplace', function(req, res, next) {
  res.render('./pages/create/workplace', {
    title: 'create workplace'
  });
});

router.get('/project', function(req, res, next) {
  res.render('./pages/create/project', {
    title: 'create project'
  });
});

module.exports = router;
