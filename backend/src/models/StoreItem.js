const mongoose = require('mongoose');

const StoreItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide a product'],
  },
  available_qty: {
    type: Number,
    required: [true, 'Please provide available quantity'],
    default: 0,
    min: [0, 'Available quantity cannot be less than 0'],
  },
  booked_qty: {
    type: Number,
    required: [true, 'Please provide booked quantity'],
    default: 0,
    min: [0, 'Booked quantity cannot be less than 0'],
  },
  sold_qty: {
    type: Number,
    required: [true, 'Please provide sold quantity'],
    default: 0,
    min: [0, 'Sold quantity cannot be less than 0'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('StoreItem', StoreItemSchema);
