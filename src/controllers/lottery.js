const { Lottery } = require('../models');

const get = async (req, res) => {
  try {
    const lottery = await Lottery.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json({ lottery });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const lottery = await Lottery.findOne({
      where: { id }
    });
    if (lottery) {
      return res.status(200).json({ lottery });
    }
    return res
      .status(404)
      .send('Lottery with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const post = async (req, res) => {
  try {
    const lottery = await Lottery.create(req.body);
    return res.status(201).json({ lottery });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;

    const lottery = await Lottery.update({ ...req.body }, { where: { id } });
    if (lottery[0] > 0) {
      return res.sendStatus(200);
    }
    throw new Error('Lottery not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Lottery.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Lottery not found');
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
