import { AppError } from '../../common/errors.js';
import { ERROR_CODES } from '../../common/constants.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateCreateCustomerPayload = (payload = {}) => {
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';

  if (!name) {
    throw new AppError('Customer name is required.', 400, ERROR_CODES.VALIDATION_ERROR, { field: 'name' });
  }

  if (!email) {
    throw new AppError('Customer email is required.', 400, ERROR_CODES.VALIDATION_ERROR, { field: 'email' });
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new AppError('Customer email is invalid.', 400, ERROR_CODES.VALIDATION_ERROR, { field: 'email' });
  }

  if (phone && phone.length < 8) {
    throw new AppError('Customer phone should be at least 8 characters long.', 400, ERROR_CODES.VALIDATION_ERROR, { field: 'phone' });
  }

  return {
    name,
    email,
    phone: phone || null,
  };
};

export const validateCreateCustomer = (req, res, next) => {
  try {
    req.validatedCustomer = validateCreateCustomerPayload(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
