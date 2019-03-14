const express = require('express');
const router = express.Router();

const createWorkplace = require('../src/create/workplace');
const gainWorkplaces = require('../src/workplace/gainWorkplaces');
const cancelDefaultWp = require('../src/workplace/cancelDefaultWp');
const deleteWp = require('../src/workplace/deleteWp');
const setWpConfig = require('../src/workplace/setWpConfig');

// create=====================================================

// /api/createWorkplace
router.post('/createWorkplace', function(req, res, next) {
  let body = req.body || {};
  console.log('/createWorkplace===>>>', body);
  let data = createWorkplace(body.wpName, body.wpPath);
  res.status(data.resCode)
    .set('Content-Type', 'text/plain')
    .json(data.data);
});

// get data====================================================

// /api/saveWpConfig
router.post('/saveWpConfig', function(req, res, next) {
  let body = req.body || {};
  let data = setWpConfig(body.wpId, body.config);

  res.status(data.resCode)
    .set('Content-Type', 'text/plain')
    .json(data.data);
});

// /api/wpList
router.get('/wpList', function(req, res, next) {
  let params = req.params || {};
  console.log('/wpList====>>>', params);
  let data = gainWorkplaces();
  res.status(data.resCode)
    .set('Content-Type', 'text/plain')
    .json(data.data);
});

// /api/setDefaultWp
router.put('/setDefaultWp', function(req, res, next) {
  let params = req.params || {};
  console.log('/setDefaultWp====>>>', params);
  let data = setDefaultWp(params.wpId);

  res.status(data.resCode)
    .set('Content-Type', 'text/plain')
    .json(data.data);
});

// /api/cancelDefaultWp
router.put('/cancelDefaultWp', function(req, res, next) {
  let params = req.params || {};
  console.log('/cancelDefaultWp====>>>', params);
  let data = cancelDefaultWp(params.wpId);

  res.status(data.resCode)
    .set('Content-Type', 'text/plain')
    .json(data.data);
});

// /api/deleteWp
router.delete('/deleteWp', function(req, res, next) {
  let params = req.params || {};
  console.log('/deleteWp====>>>', params);
  let data = deleteWp(params.wpId);

  res.status(data.resCode)
    .set('Content-Type', 'text/plain')
    .json(data.data);
});

module.exports = router;
