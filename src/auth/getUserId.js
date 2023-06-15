const { User } = require('../models');

const getUserId = async (req) => {
  const { email } = req.user;
  const {id} = await User.findOne({ where: { email: email } });
  return id;
};

module.exports = getUserId;
