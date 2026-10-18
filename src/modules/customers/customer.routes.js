import { Router } from 'express';
import { createCustomerController } from './customer.controller.js';
import { validateCreateCustomer } from './customer.validation.js';

const customerRouter = Router();

customerRouter.post('/', validateCreateCustomer, createCustomerController);

export default customerRouter;
