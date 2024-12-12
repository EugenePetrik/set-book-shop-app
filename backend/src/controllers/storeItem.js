const storeItemService = require('../services/storeItem');
const asyncHandler = require('../middleware/async');

/**
 * @desc      Get store items
 * @route     GET /api/v1/store-items
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getStoreItems = asyncHandler(async (req, res, next) => {
  const storeItems = await storeItemService.getStoreItems();

  res.status(200).json({
    success: true,
    data: storeItems,
  });
});

/**
 * @desc      Get specific store item
 * @route     GET /api/v1/store-items/:id
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getStoreItemById = asyncHandler(async (req, res, next) => {
  const storeItem = await storeItemService.getStoreItemById(req.params.id);

  res.status(200).json({
    success: true,
    data: storeItem,
  });
});

/**
 * @desc      Create store item
 * @route     POST /api/v1/store-items
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.createStoreItem = asyncHandler(async (req, res, next) => {
  const storeItem = await storeItemService.createStoreItem(req.body);

  res.status(201).json({
    success: true,
    data: storeItem,
  });
});

/**
 * @desc      Update store item
 * @route     PUT /api/v1/store-items/:id
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.updateStoreItem = asyncHandler(async (req, res, next) => {
  const storeItem = await storeItemService.updateStoreItem(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: storeItem,
  });
});

/**
 * @desc      Delete store item
 * @route     DELETE /api/v1/store-items/:id
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.deleteStoreItem = asyncHandler(async (req, res, next) => {
  await storeItemService.deleteStoreItem(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
