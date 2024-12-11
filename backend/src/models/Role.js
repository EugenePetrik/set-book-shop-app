const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['ADMIN', 'MANAGER', 'CUSTOMER'],
    required: [true, 'Please provide a role name'],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Role', RoleSchema);
