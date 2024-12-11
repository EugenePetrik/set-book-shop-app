/**
 * Wraps an async function and passes any errors to the next middleware.
 *
 * @param      {Function} fn - The async function to wrap.
 * @returns    {Function} - A function that executes the async function and catches any errors.
 */
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
