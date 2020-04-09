const { resolve } = require('path');
const { load } = require('dotenv-extended');
const { env } = require('./src/helpers/utils');

const isTestEnvironment = env('NODE_ENV') === 'test';
const dotenvFile = isTestEnvironment ? '.env.test' : '.env';

load({
  silent: true,
  path: resolve(__dirname, dotenvFile),
  defaults: resolve(__dirname, '.env'),
  schema: resolve(__dirname, '.env.example'),
  errorOnMissing: !isTestEnvironment,
  errorOnExtra: !isTestEnvironment,
  errorOnRegex: false,
  overrideProcessEnv: true
});
