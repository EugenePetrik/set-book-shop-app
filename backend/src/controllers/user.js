const userService = require('../services/user');
const asyncHandler = require('../middleware/async');

/**
 * @desc      Get users
 * @route     GET /api/v1/users
 * @access    Private/Admin/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await userService.getUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * @desc      Get specific user
 * @route     GET /api/v1/users/:id
 * @access    Private/Admin/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc      Create user
 * @route     POST /api/v1/users
 * @access    Private/Admin/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

/**
 * @desc      Update user
 * @route     PUT /api/v1/users/:id
 * @access    Private/Admin/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await userService.updateUser(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc      Delete user
 * @route     DELETE /api/v1/users/:id
 * @access    Private/Admin/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await userService.deleteUser(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
