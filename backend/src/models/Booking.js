const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide a product'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user'],
  },
  delivery_address: {
    type: String,
    required: [true, 'Please provide a delivery address'],
    minlength: [10, 'Delivery address can not be less than 10 characters'],
  },
  date: {
    type: String,
    required: [true, 'Please provide a date'],
  },
  time: {
    type: String,
    required: [true, 'Please provide a time'],
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookingStatus',
    required: [true, 'Please provide a status'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide a quantity'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
