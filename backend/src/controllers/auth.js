const asyncHandler = require('../middleware/async');
const authService = require('../services/auth');

/**
 * @desc      Register user
 * @route     POST /api/v1/auth/register
 * @access    Public
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.register = asyncHandler(async (req, res, next) => {
  const user = await authService.register(req.body);

  sendTokenResponse(user, 201, res);
});

/**
 * @desc      Login user
 * @route     POST /api/v1/auth/login
 * @access    Public
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await authService.login(email, password);

  sendTokenResponse(user, 200, res);
});

/**
 * @desc      Logout user / clear cookie
 * @route     GET /api/v1/auth/logout
 * @access    Public
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.logout = asyncHandler(async (req, res, next) => {
  const { token, options } = authService.logout();

  res.cookie('token', token, options);

  res.status(200).json({
    success: true,
    data: {},
  });
});

/**
 * @desc      Get current logged in user
 * @route     GET /api/v1/auth/me
 * @access    Private
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = authService.getMe(req.user);

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc      Update user details
 * @route     PUT /api/v1/auth/update-details
 * @access    Private
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    login: req.body.login,
  };

  const user = await authService.updateDetails(req.user.id, fieldsToUpdate);

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Get token from model, create cookie and send response
 * @param     {Object} user - User object
 * @param     {Number} statusCode - HTTP status code
 * @param     {import('express').Response} res - Express response object
 */
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
