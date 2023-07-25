const getUserId = require('../auth/getUserId');
const { isNotAdmin } = require('../auth/roles');
const { Client, User } = require('../models');
const { validateNotRepeatedModel, handleError } = require('./validator');

const REPEATED_ERROR_MESSAGE = 'Ya existe un cliente con el nombre elegido';

const validateNotRepeated = async (fields) =>
  await validateNotRepeatedModel(Client, fields, REPEATED_ERROR_MESSAGE);

const get = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const clients = await Client.findAll({ order: [['id', 'ASC']], where: { userId} });
    return res.status(200).json({ clients });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getBySeller = async (req, res) => {
  try {
    const { user: loggedUser } = req;

    if (isNotAdmin(loggedUser)) {
      return res.sendStatus(403);
    }

    const { id: sellerId } = req.params;

    const clients = await Client.findAll({ order: [['id', 'ASC']], where: { userId: sellerId} });
    return res.status(200).json({ clients });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await getUserId(req);
    const client = await Client.findOne({
      where: { id, userId }
    });
    if (client) {
      return res.status(200).json({ client });
    }
    return res
      .status(404)
      .send('Client with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const post = async (req, res) => {
  try {
    const { name } = req.body;
    await validateNotRepeated({ name });

    const clientBody = {...req.body};
    clientBody.userId = await getUserId(req);

    const client = await Client.create(clientBody);
    return res.status(201).json({ client });
  } catch (error) {
    return handleError(error, res, REPEATED_ERROR_MESSAGE);
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = await getUserId(req);
    await validateNotRepeated({ name, id, userId });

    const client = await Client.update({ ...req.body, userId }, { where: { id, userId } });
    if (client[0] > 0) {
      return res.sendStatus(200);
    }
    throw new Error('Client not found');
  } catch (error) {
    console.log(error);
    return handleError(error, res, REPEATED_ERROR_MESSAGE);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await getUserId(req);
    const deleted = await Client.destroy({ where: { id, userId } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Client not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  get,
  getBySeller,
  getById,
  post,
  put,
  remove,
};
