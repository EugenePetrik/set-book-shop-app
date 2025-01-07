const { readFileSync } = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const { join } = require('path');

// Prevent seeding in production environment
if (process.env.NODE_ENV === 'production') {
  throw new Error('You cannot seed the production database.');
}

// Load environment variables from .env file
require('dotenv').config();

// Load models
const Role = require('../models/Role');
const BookingStatus = require('../models/BookingStatus');
const User = require('../models/User');
const Product = require('../models/Product');
const StoreItem = require('../models/StoreItem');
const Booking = require('../models/Booking');

// Connect to the database
mongoose.connect(process.env.MONGODB_URI, {});

// Read JSON files containing seed data
const roles = JSON.parse(
  readFileSync(join(process.cwd(), '_data', 'roles.json'), 'utf-8'),
);

const bookingStatuses = JSON.parse(
  readFileSync(join(process.cwd(), '_data', 'booking-statuses.json'), 'utf-8'),
);

const users = JSON.parse(
  readFileSync(join(process.cwd(), '_data', 'users.json'), 'utf-8'),
);

const products = JSON.parse(
  readFileSync(join(process.cwd(), '_data', 'products.json'), 'utf-8'),
);

const storeItems = JSON.parse(
  readFileSync(join(process.cwd(), '_data', 'store-items.json'), 'utf-8'),
);

const bookings = JSON.parse(
  readFileSync(join(process.cwd(), '_data', 'bookings.json'), 'utf-8'),
);

/**
 * Import data into the database from JSON files.
 * @async
 * @function  importData
 * @returns   {Promise<void>}
 */
const importData = async () => {
  try {
    await Role.create(roles);
    await BookingStatus.create(bookingStatuses);
    await User.create(users);
    await Product.create(products);
    await StoreItem.create(storeItems);
    await Booking.create(bookings);
    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

/**
 * Delete all data from the database.
 * @async
 * @function  deleteData
 * @returns   {Promise<void>}
 */
const deleteData = async () => {
  try {
    await Booking.deleteMany();
    await StoreItem.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await BookingStatus.deleteMany();
    await Role.deleteMany();
    console.log('Data destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Run import or delete functions based on command line arguments
if (process.argv[2] === '-i') {
  importData();
}

if (process.argv[2] === '-d') {
  deleteData();
}
