const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Register a new user.
 *
 * @param    {Object} userData - The user data to register.
 * @param    {string} userData.name - The name of the user.
 * @param    {string} userData.email - The email of the user.
 * @param    {string} userData.password - The password of the user.
 * @returns  {Promise<Object>} The newly registered user.
 */
exports.register = async userData => {
  const user = new User(userData);
  return user.save();
};

/**
 * Log in a user.
 *
 * @param    {string} email - The email of the user.
 * @param    {string} password - The password of the user.
 * @returns  {Promise<Object>} The logged in user.
 * @throws   {ErrorResponse} If email or password is not provided or invalid credentials.
 */
exports.login = async (email, password) => {
  if (!email || !password) {
    throw new ErrorResponse('Please provide an email and password', 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  return user;
};

/**
 * Log out a user by setting a token expiration.
 *
 * @returns {Object} An object containing the token and cookie options.
 */
exports.logout = () => {
  return {
    token: 'none',
    options: {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    },
  };
};

/**
 * Update user details.
 *
 * @param    {string} userId - The ID of the user.
 * @param    {Object} fieldsToUpdate - The fields to update.
 * @param    {string} [fieldsToUpdate.name] - The new name of the user.
 * @param    {string} [fieldsToUpdate.email] - The new email of the user.
 * @param    {string} [fieldsToUpdate.phone] - The new phone number of the user.
 * @param    {string} [fieldsToUpdate.address] - The new address of the user.
 * @param    {string} [fieldsToUpdate.login] - The new login of the user.
 * @returns  {Promise<Object>} The updated user.
 * @throws   {ErrorResponse} If the user is not found.
 */
exports.updateDetails = async (userId, fieldsToUpdate) => {
  const updatedUser = await User.findByIdAndUpdate(userId, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new ErrorResponse(`User not found with id of ${userId}`, 404);
  }

  return User.findById(updatedUser._id).populate({
    path: 'role',
    select: '_id name',
  });
};

/**
 * Get the current logged in user.
 *
 * @param    {Object} user - The current user object.
 * @returns  {Object} The current user.
 */
exports.getMe = user => {
  return user;
};
