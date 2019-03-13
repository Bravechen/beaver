const express = require('express');
const router = express.Router();

const createWorkplace = require('../src/create/workplace');

router.post('/createWorkplace', function(req, res, next) {
  let params = req.params;
  console.log('/createWorkplace===>>>', params);
  let data = createWorkplace(params.wpName, params.wpPath);
  res.status(data.resCode)
    .set('Content-Type', 'text/plain')
    .json(data.data);
});

module.exports = router;
