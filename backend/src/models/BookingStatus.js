const mongoose = require('mongoose');

const BookingStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['SUBMITTED', 'REJECTED', 'APPROVED', 'CANCELED', 'IN_DELIVERY', 'COMPLETED'],
    required: [true, 'Please provide a booking status name'],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BookingStatus', BookingStatusSchema);
