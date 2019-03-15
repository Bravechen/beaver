const express = require('express');
const router = express.Router();

const createWorkplace = require('../src/create/workplace');
const createProject = require('../src/create/project');
const gainWorkplaces = require('../src/workplace/gainWorkplaces');
const cancelDefaultWp = require('../src/workplace/cancelDefaultWp');
const deleteWp = require('../src/workplace/deleteWp');
const setWpConfig = require('../src/workplace/setWpConfig');

const gainProjects = require('../src/projects/gainProjects');
const setProjectConfig = require('../src/projects/setProjectConfig');
const deleteProject = require('../src/projects/deleteProject');

// create=====================================================

// /api/createWorkplace
router.post('/createWorkplace', function(req, res, next) {
  let body = req.body || {};
  createWorkplace(body.wpName, body.wpPath)
    .then(function(data) {
      console.log('/createWorkplace===>>>', body, data);
      res.status(data.resCode)
        .set('Content-Type', 'text/plain')
        .json(data.data);
    })
    .catch(function(err) {
      console.error('/createWorkplace===>>> err', err);
      res.status(500)
      .set('Content-Type', 'text/plain')
      .json(err);
    });
});

// /api/createProject
router.post('/createProject', function(req, res, next) {
  let body = req.body || {};
  let data = createProject(body.wpId, body.config);
  res.status(data.resCode)
    .set('Content-Type', 'text/plain')
    .json(data.data);
});

// workplace====================================================

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

// projects=====================================================

// /api/saveProjectConfig
router.post('/saveProjectConfig', function(req, res, next) {
  let body = req.body || {};
  let data = setProjectConfig(body.projectId, body.config);
  res.status(data.resCode)
    .set('Content-Type', 'text/plain')
    .json(data.data);
});

// /api/projectList
router.get('/projectList', function(req, res, next) {
  let params = req.params || {};
  let data = gainProjects(params.wpId);
  res.status(data.resCode)
    .set('Content-Type', 'text/plain')
    .json(data.data);
});

// /api/deleteProject
router.delete('/deleteProject', function(req, res, next) {
  let params = req.params || {};
  let data = deleteProject(params.projectId);
  res.status(data.resCode)
    .set('Content-Type', 'text/plain')
    .json(data.data);
});

module.exports = router;
