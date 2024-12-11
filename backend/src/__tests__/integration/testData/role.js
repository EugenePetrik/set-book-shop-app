const Role = require('../../../models/Role');

async function getRole(name) {
  return Role.findOne({ name });
}

module.exports = { getRole };
