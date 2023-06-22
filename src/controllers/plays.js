const { Op } = require('sequelize');
const getUserId = require('../auth/getUserId');
const { ROLES } = require('../auth/roles');
const { Client, User, Lottery, Play, sequelize } = require('../models');

const get = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const lottery = await Lottery.findOne({where: { current: true}});
    const plays = await sequelize.query(`
      select c."id" as "clientId", c."name", p."id", p."n1", p."n2", p."n3", p."n4" from "Plays" p
      join "Clients" c on p."clientId" = c."id"
      join "Users" u on c."userId" = u."id"
      where p."lotteryId" = ${lottery.id} 
      and u."id" = ${userId}
    `);
    return res.status(200).json({ plays: plays[0] });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const post = async (req, res) => {
  try {
    /*
    req.body = {
      clientId,
      n1, n2, n3, n4
    }
    const userId = await getUserId(req);
    userId debe ser de tipo seller, y hay que verificar que el clientId sea un cliente del userId (vendedor)
    lotteryId se debe buscar en la tabla lottery y se toma el id del current lottery
    */
    const { clientId, n1, n2, n3, n4 } = req.body;
    const sellerId = await getUserId(req);
    
    const seller = await User.findOne({ where: { id: sellerId } });
    if (seller.role !== ROLES.seller) {
      return handleError(error, res, 'El usuario que crea el loto debe ser vendedor');
    }

    const lottery = await Lottery.findOne({ where: { current: true } });

    /*
    Antes de cargar debo verificar que ese mismo cliente no tenga un mismo loto con los mismos numeros para ese mismo lottery
    */
    const repeatedPlay = await Play.findOne({ where: {
      clientId, n1, n2, n3, n4, lotteryId: lottery.id
    }});

    if (repeatedPlay) {
      return res.status(500).send('El cliente ya tiene un loto con esos mismos numeros en este sorteo');
    }

    const play = await Play.create({
      clientId, n1, n2, n3, n4, lotteryId: lottery.id
    });

    return res.status(201).json({ play });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await getUserId(req);
    const play = await Play.findOne({where: { id }});
    if (play) {
      const client = await Client.findOne({ where: { id: play.clientId }});
      if (client.userId === userId) {
        const deleted = await Play.destroy({ where: { id: play.id } });
        if (deleted) {
          return res.status(204).send();
        }
        throw new Error('Error');
      }
      throw new Error('El loto no pertenece al vendedor');
    }
    
    throw new Error('Play not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  get,
  post,
  remove,
};
