import { ERROR_CODES } from '../common/constants.js';
import { buildErrorResponse } from '../common/response.js';

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const code = error.code || ERROR_CODES.INTERNAL_ERROR;
  const message = error.message || 'Internal Server Error';

  const payload = buildErrorResponse(message, code, {
    path: req.originalUrl,
    method: req.method,
    details: error.details || null,
  });

  return res.status(statusCode).json(payload);
};
