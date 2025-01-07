const productService = require('../services/product');
const asyncHandler = require('../middleware/async');

/**
 * @desc      Get products
 * @route     GET /api/v1/products
 * @access    Private/Manager/Customer
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await productService.getProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
});

/**
 * @desc      Get specific product
 * @route     GET /api/v1/products/:id
 * @access    Private/Manager/Customer
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await productService.getProductById(req.params.id);

  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * @desc      Create product
 * @route     POST /api/v1/products
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.createProduct(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

/**
 * @desc      Update product
 * @route     PUT /api/v1/products/:id
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.updateProduct(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * @desc      Delete product
 * @route     DELETE /api/v1/products/:id
 * @access    Private/Manager
 * @param     {import('express').Request} req - Express request object
 * @param     {import('express').Response} res - Express response object
 * @param     {import('express').NextFunction} next - Express next middleware function
 */
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  await productService.deleteProduct(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
