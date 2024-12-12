const roleService = require('../services/role');
const asyncHandler = require('../middleware/async');

/**
 * @desc      Get roles
 * @route     GET /api/v1/roles
 * @access    Private/Admin
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getRoles = asyncHandler(async (req, res, next) => {
  const roles = await roleService.getRoles();

  res.status(200).json({
    success: true,
    data: roles,
  });
});

/**
 * @desc      Get specific role
 * @route     GET /api/v1/roles/:id
 * @access    Private/Admin
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getRoleById = asyncHandler(async (req, res, next) => {
  const role = await roleService.getRoleById(req.params.id);

  res.status(200).json({
    success: true,
    data: role,
  });
});

/**
 * @desc      Create role
 * @route     POST /api/v1/roles
 * @access    Private/Admin
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.createRole = asyncHandler(async (req, res, next) => {
  const role = await roleService.createRole(req.body);

  res.status(201).json({
    success: true,
    data: role,
  });
});

/**
 * @desc      Update role
 * @route     PUT /api/v1/roles/:id
 * @access    Private/Admin
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.updateRole = asyncHandler(async (req, res, next) => {
  const role = await roleService.updateRole(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: role,
  });
});

/**
 * @desc      Delete role
 * @route     DELETE /api/v1/roles/:id
 * @access    Private/Admin
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.deleteRole = asyncHandler(async (req, res, next) => {
  await roleService.deleteRole(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
