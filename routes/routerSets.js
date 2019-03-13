const index = require('./index');
const create = require('./create');
const workplace = require('./workplace');
const projects = require('./projects');
const services = require('./services');

module.exports = function(app) {
  app.use('/', index);
  app.use('/create', create);
  app.use('/workplace', workplace);
  app.use('/projects', projects);
  app.use('/api', services);
}
