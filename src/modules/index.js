import homeRouter from './home';
import authRouter from './auth';
import featuresRouter from './features';

/**
 * Routes register
 *
 * @param {object} app - The express main app
 * @returns {void}
 */
const routes = app => {
  const apiPrefix = '/api/v1';

  app.use(homeRouter);
  app.use(authRouter);
  app.use(apiPrefix, featuresRouter);

  return app;
};

export default routes;
