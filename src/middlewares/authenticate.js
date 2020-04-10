import createError from 'http-errors';
import JWTService from '../services/jwt.service';

export default class AuthGuard {
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
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw createError(
          401,
          'Oops, authentication failed. A token is required.'
        );
      }

      const token = authHeader.split(' ').pop();
      const decoded = JWTService.verify(token);

      if (!decoded) {
        throw createError(
          401,
          'Oops, authentication failed or your token has expired.'
        );
      }

      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  }
}
