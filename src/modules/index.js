const homeRouter = require('./home');
const usersRouter = require('./users');

/**
 * Routes register
 *
 * @param {object} app - The express main app
 * @returns {void}
 */
const routes = app => {
  const apiPrefix = '/api/v1';

  app.use(homeRouter);
  app.use(apiPrefix, usersRouter);

  return app;
};

module.exports = routes;
