const homeRouter = require('./home');
const authRouter = require('./auth');
const featuresRouter = require('./features');

/**
 * Routes register
 *
 * @param {object} app - The express main app
 * @returns {void}
 */
const routes = app => {
  const apiPrefix = '/api/v1';

  app.use(homeRouter);
  app.use(apiPrefix, authRouter);
  app.use(apiPrefix, featuresRouter);

  return app;
};

module.exports = routes;
