const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Get all users.
 * @returns  {Promise<Array>} - Array of users with populated role details.
 */
exports.getUsers = async () => {
  return User.find().populate({
    path: 'role',
    select: '_id name',
  });
};

/**
 * Get a user by ID.
 * @param    {string} id - The ID of the user.
 * @returns  {Promise<Object>} - The user object with populated role details.
 * @throws   {ErrorResponse} - Throws error if the user is not found.
 */
exports.getUserById = async id => {
  const user = await User.findById(id).populate({
    path: 'role',
    select: '_id name',
  });

  if (!user) {
    throw new ErrorResponse(`User not found with id of ${id}`, 404);
  }

  return user;
};

/**
 * Create a new user.
 * @param    {Object} userData - The data for the new user.
 * @returns  {Promise<Object>} - The created user object with populated role details.
 * @throws   {ErrorResponse} - Throws error if required fields are missing.
 */
exports.createUser = async userData => {
  const requiredFields = [
    'name',
    'role',
    'email',
    'phone',
    'address',
    'login',
    'password',
  ];

  for (const field of requiredFields) {
    if (!userData[field]) {
      throw new ErrorResponse(`Please provide a ${field}`, 400);
    }
  }

  const user = new User(userData);
  await user.save();
  await user.populate('role', '_id name');
  return user;
};

/**
 * Update a user by ID.
 * @param    {string} id - The ID of the user to update.
 * @param    {Object} userData - The new data for the user.
 * @returns  {Promise<Object>} - The updated user object with populated role details.
 * @throws   {ErrorResponse} - Throws error if the user is not found.
 */
exports.updateUser = async (id, userData) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ErrorResponse(`User not found with id of ${id}`, 404);
  }

  const updatedUser = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });

  await updatedUser.populate({
    path: 'role',
    select: '_id name',
  });

  return updatedUser;
};

/**
 * Delete a user by ID.
 * @param   {string} id - The ID of the user to delete.
 * @throws  {ErrorResponse} - Throws error if the user is not found.
 */
exports.deleteUser = async id => {
  const user = await User.findById(id);

  if (!user) {
    throw new ErrorResponse(`User not found with id of ${id}`, 404);
  }

  await User.findByIdAndDelete(id);
};
