/**
 * A simple wrapper for console
 */
const logger = console;

/**
 * Gets the value of an environment variable.
 *
 * @param {string} key - Environment variable key
 * @param {string|number|boolean} defaultValue - Value will be used if no environment
 * variable exists for the given key
 * @returns {string|number|boolean} The environment variable value
 */
const env = (key, defaultValue = null) => {
  const value = process.env[key];
  const bools = ['true', 'false'];

  if (bools.includes(value)) return !!value;
  if (value === '(empty)') return '';
  return value || defaultValue;
};

/**
 * Normalize a port into a number, string, or false.
 *
 * @param {number|string|boolean} value - The port value
 * @returns {number|boolean} - Normalized port value or false
 */
const normalizePort = value => {
  const port = parseInt(value, 10);
  if (Number.isNaN(port)) return port;
  return port >= 0 ? port : false;
};

module.exports = {
  logger,
  env,
  normalizePort
};
