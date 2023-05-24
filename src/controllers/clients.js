const { Client } = require('../models');
const { validateNotRepeatedModel, handleError } = require('./validator');

const REPEATED_ERROR_MESSAGE = 'Ya existe un cliente con el nombre elegido';

const validateNotRepeated = async (fields) =>
  await validateNotRepeatedModel(Client, fields, REPEATED_ERROR_MESSAGE);

const get = async (req, res) => {
  try {
    const clients = await Client.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json({ clients });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findOne({
      where: { id }
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

    const client = await Client.create(req.body);
    return res.status(201).json({ client });
  } catch (error) {
    return handleError(error, res, REPEATED_ERROR_MESSAGE);
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await validateNotRepeated({ name, id });

    const client = await Client.update({ ...req.body }, { where: { id } });
    if (client) {
      return res.sendStatus(200);
    }
    throw new Error('Client not found');
  } catch (error) {
    return handleError(error, res, REPEATED_ERROR_MESSAGE);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Client.destroy({ where: { id } });
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
  getById,
  post,
  put,
  remove,
};
