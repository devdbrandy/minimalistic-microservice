const createError = require('http-errors');
const JWTService = require('../services/jwt.service');

class AuthGuard {
  /**
   * A middleware to determine if the request is made by an authenticated user
   *
   * @param {Request} req - Express Request object
   * @param {Response} res - Express Response object
   * @param {Function} next - Calls the next middleware function in the stack
   * @returns {object} HTTP response or moves to the next middleware
   * @memberof AuthGuard
   */
  static async verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');

    try {
      if (!authHeader)
        throw createError(403, 'Authentication token is required');

      if (!authHeader.startsWith('Bearer')) {
        throw createError(
          401,
          'Oops, authentication failed or token has expired.'
        );
      }

      const token = authHeader.split(' ').pop();
      const decoded = JWTService.verify(token);

      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthGuard;
