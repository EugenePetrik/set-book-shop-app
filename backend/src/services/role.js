const Role = require('../models/Role');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Get all roles.
 * @returns  {Promise<Array>} - Array of roles.
 */
exports.getRoles = async () => {
  return Role.find();
};

/**
 * Get a role by ID.
 * @param    {string} id - The ID of the role.
 * @returns  {Promise<Object>} - The role object.
 * @throws   {ErrorResponse} - Throws error if the role is not found.
 */
exports.getRoleById = async id => {
  const role = await Role.findById(id);

  if (!role) {
    throw new ErrorResponse(`Role not found with id of ${id}`, 404);
  }

  return role;
};

/**
 * Create a new role.
 * @param    {Object} roleData - The data for the new role.
 * @returns  {Promise<Object>} - The created role object.
 */
exports.createRole = async roleData => {
  const role = new Role(roleData);
  return role.save();
};

/**
 * Update a role by ID.
 * @param    {string} id - The ID of the role to update.
 * @param    {Object} roleData - The new data for the role.
 * @returns  {Promise<Object>} - The updated role object.
 * @throws   {ErrorResponse} - Throws error if the role is not found.
 */
exports.updateRole = async (id, roleData) => {
  const role = await Role.findById(id);

  if (!role) {
    throw new ErrorResponse(`Role not found with id of ${id}`, 404);
  }

  return Role.findByIdAndUpdate(id, roleData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete a role by ID.
 * @param   {string} id - The ID of the role to delete.
 * @throws  {ErrorResponse} - Throws error if the role is not found.
 */
exports.deleteRole = async id => {
  const role = await Role.findById(id);

  if (!role) {
    throw new ErrorResponse(`Role not found with id of ${id}`, 404);
  }

  await Role.findByIdAndDelete(id);
};
