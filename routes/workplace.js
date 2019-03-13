const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('./pages/workplace/workplace', {
    title: '工作区'
  });
});

module.exports = router;
