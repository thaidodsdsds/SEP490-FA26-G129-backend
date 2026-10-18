import dataSource from '../../database/dataSource.js';

export const getCustomerRepository = () => dataSource.getRepository('Customer');

export const findCustomerByEmail = async (email) => {
  const customerRepository = getCustomerRepository();
  return customerRepository.findOne({ where: { email } });
};

export const createCustomer = async (customerData) => {
  const customerRepository = getCustomerRepository();
  const customer = customerRepository.create(customerData);
  return customerRepository.save(customer);
};
