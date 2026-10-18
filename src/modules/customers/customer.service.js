import { ERROR_CODES } from '../../common/constants.js';
import { AppError } from '../../common/errors.js';
import { validateCreateCustomerPayload } from './customer.validation.js';
import { createCustomer, findCustomerByEmail } from './customer.repository.js';

export const createCustomerService = async (payload) => {
  const sanitizedPayload = validateCreateCustomerPayload(payload);

  const existingCustomer = await findCustomerByEmail(sanitizedPayload.email);
  if (existingCustomer) {
    throw new AppError('Customer with this email already exists.', 409, ERROR_CODES.CONFLICT, {
      field: 'email',
    });
  }

  const customer = await createCustomer(sanitizedPayload);
  return customer;
};
