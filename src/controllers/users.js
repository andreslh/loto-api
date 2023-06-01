const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const {
  addRefreshToken,
  removeRefreshToken,
  isRefreshTokenInvalid,
} = require('../auth/refreshTokens');

const { User } = require('../models');
const { ROLES, isNotAdmin } = require('../auth/roles');

const EXPIRATION_TIME = '1d';

const getAccessToken = (email, role) =>
  jwt.sign({ email, role }, config.accessTokenSecret, {
    expiresIn: EXPIRATION_TIME,
  });

const getRefreshToken = (email, role) =>
  jwt.sign({ email, role }, config.refreshTokenSecret);

const getHashedPassword = (password) => bcrypt.hashSync(password, 10);

const isPasswordCorrect = (password, comparePassword) =>
  bcrypt.compareSync(password, comparePassword);

const isEmailRepeated = async (email) =>
  (await User.findOne({ where: { email } })) ? true : false;

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user: loggedUser } = req;

    if (isNotAdmin(loggedUser)) {
      return res.sendStatus(403);
    }

    const isRepateted = await isEmailRepeated(email);
    if (isRepateted) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const user = await User.create({
      email,
      password: getHashedPassword(password),
      role: ROLES.seller,
    });
    return res.status(201).json({ user: { email: user.email } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });

  if (user && isPasswordCorrect(password, user.password)) {
    const { email, role, id, name } = user;
    const accessToken = getAccessToken(email, role);
    const refreshToken = getRefreshToken(email, role);
    await addRefreshToken(refreshToken);

    res.json({
      user: {
        name: user.name,
        role: user.role
      },
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json({ message: 'Email or password incorrect' });
  }
};

const logout = async (req, res) => {
  const { token } = req.body;

  try {
    const isTokenInvalid = await isRefreshTokenInvalid(token);
    if (isTokenInvalid) {
      return res.sendStatus(403);
    }

    await removeRefreshToken(token);
    res.send('Logout successful');
  } catch (e) {
    return res.sendStatus(500);
  }
};

const token = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  const isTokenInvalid = await isRefreshTokenInvalid(token);
  if (isTokenInvalid) {
    return res.sendStatus(403);
  }

  jwt.verify(token, config.refreshTokenSecret, (err, { email, role }) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = getAccessToken(email, role);

    res.json({
      accessToken,
    });
  });
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const {
    user: { email },
  } = req;

  const user = await User.findOne({
    where: { email },
  });

  if (isPasswordCorrect(currentPassword, user.password)) {
    const userUpdated = await User.update(
      { password: getHashedPassword(newPassword) },
      { where: { email } }
    );
    if (userUpdated) {
      return res.sendStatus(200);
    }
    return res.sendStatus(500);
  } else {
    res
      .status(400)
      .json({ message: 'La contraseña actual ingresada es incorrecta' });
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

const resetPassword = async (req, res) => {
  try {
    const { id, newPassword } = req.body;
    const user = await User.findOne({
      where: { id },
    });
    if (user) {
      const userUpdated = await User.update(
        { password: getHashedPassword(newPassword) },
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
  login,
  token,
  logout,
  changePassword,
  getByRole,
  resetPassword,
  remove
};