// @ts-check
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import baseConfig from '../config/baseConfig';

export const manager = {
  name: 'Douglas Jason',
  email: 'manager@example.com',
  phone: '0012633289419',
  address: '37397 John Plains, North Lauraville, AZ 59986',
  login: 'douglasjason',
  password: 'Qwerty213',
};

export const customer = {
  name: faker.person.fullName(),
  email: `${randomUUID().replace(/-/g, '')}@example.com`,
  phone: '7452268920123',
  address: faker.location.streetAddress(),
  login: `${faker.internet.username()}_${Date.now()}`,
  password: 'Qwerty213',
  role: baseConfig.CUSTOMER_ROLE_ID,
};
