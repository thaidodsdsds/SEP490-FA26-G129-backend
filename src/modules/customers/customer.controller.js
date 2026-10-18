import { AppError } from '../../common/errors.js';
import { createCustomerService } from './customer.service.js';

export const createCustomerController = async (req, res, next) => {
  try {
    const customer = await createCustomerService(req.validatedCustomer || req.body);

    return res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: customer,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    return next(new AppError('Unable to create customer.', 500, 'INTERNAL_ERROR', error.message));
  }
};
