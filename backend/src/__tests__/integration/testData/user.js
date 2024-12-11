const { faker } = require('@faker-js/faker');
const { randomUUID } = require('node:crypto');
const { getRole } = require('./role');
const User = require('../../../models/User');

const users = {
  admin: {
    email: 'admin@example.com',
    password: 'Qwerty213',
  },
  manager: {
    email: 'manager@example.com',
    password: 'Qwerty213',
  },
  customer: {
    email: 'customer@example.com',
    password: 'Qwerty213',
  },
};

function getUser(role) {
  return users[role.toLowerCase()];
}

async function getUserIdByRole(role) {
  const user = await User.findOne({ email: users[role.toLowerCase()].email });
  return user._id;
}

async function getNewCustomer() {
  const role = await getRole('CUSTOMER');

  return {
    name: faker.person.fullName(),
    email: `${randomUUID().replace(/-/g, '')}@example.com`,
    phone: '7452268920123',
    address: faker.location.streetAddress(),
    login: `${faker.internet.username()}_${Date.now()}`,
    password: 'Qwerty213',
    role: role._id.toString(),
  };
}

async function createCustomer() {
  const user = await getNewCustomer();
  return User.create(user);
}

function getUpdateUserData() {
  return {
    email: `${randomUUID().replace(/-/g, '')}@example.com`,
    name: faker.person.fullName(),
    phone: '7452268920123',
    address: faker.location.streetAddress(),
  };
}

module.exports = {
  users,
  getNewCustomer,
  getUser,
  getUserIdByRole,
  createCustomer,
  getUpdateUserData,
};
