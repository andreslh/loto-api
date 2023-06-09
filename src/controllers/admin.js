const bcrypt = require('bcrypt');

const { User } = require('../models');
const { ROLES, isNotAdmin } = require('../auth/roles');

const getHashedPassword = (password) => bcrypt.hashSync(password, 10);

const isEmailRepeated = async (email) =>
  (await User.findOne({ where: { email } })) ? true : false;

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { user: loggedUser } = req;

    if (isNotAdmin(loggedUser)) {
      return res.sendStatus(403);
    }

    const isRepateted = await isEmailRepeated(email);
    if (isRepateted) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const user = await User.create({
      name,
      email,
      password: getHashedPassword(password),
      role: ROLES.seller,
    });
    return res.status(201).json({ user: { email: user.email } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.findAll({
      where: { role },
    });
    if (users) {
      return res.status(200).json({ users });
    }
    return res.status(404).send('Users with the role does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findOne({
      where: { id },
    });

    if (user) {
      let newUser = {};

      if (email && email !== user.email) {
        const isRepateted = await isEmailRepeated(email);
        if (isRepateted) {
          return res.status(400).json({ error: 'Email is already in use' });
        }
        newUser.email = email;
      }

      if (name) {
        newUser.name = name;
      }

      if (password) {
        newUser.password = getHashedPassword(password)
      }

      const userUpdated = await User.update(
        newUser,
        { where: { id } }
      );
      if (userUpdated) {
        return res.sendStatus(200);
      }
      return res.sendStatus(500);
    }
    return res.status(404).send('Users with the id does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  signup,
  getByRole,
  edit,
  remove
};