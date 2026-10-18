import jwt from 'jsonwebtoken';
import { ERROR_CODES } from '../common/constants.js';
import env from '../config/env.js';
import { AppError } from '../common/errors.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authentication token missing or invalid.', 401, ERROR_CODES.UNAUTHORIZED));
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const decoded = jwt.verify(token, env.jwt.secret);
    req.user = decoded;
    return next();
  } catch (error) {
    return next(new AppError('Authentication token is invalid or expired.', 401, ERROR_CODES.UNAUTHORIZED, error.message));
  }
};

export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(new AppError('User context is missing.', 401, ERROR_CODES.UNAUTHORIZED));
  }

  const roles = Array.isArray(req.user.role) ? req.user.role : [req.user.role];
  const hasAccess = allowedRoles.length === 0 || allowedRoles.some((role) => roles.includes(role));

  if (!hasAccess) {
    return next(new AppError('Permission denied.', 403, ERROR_CODES.FORBIDDEN));
  }

  return next();
};
