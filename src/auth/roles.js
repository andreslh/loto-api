const ROLES = {
  admin: 1,
  seller: 2,
};

const isNotAdmin = (user) => user.role !== ROLES.admin;

module.exports = {
  ROLES,
  isNotAdmin,
};
