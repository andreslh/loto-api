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

module.exports = {
  login,
  token,
  logout,
  changePassword,
};