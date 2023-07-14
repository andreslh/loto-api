const { Lottery, Play, Client, User } = require('../models');
const { getNumbersToTen, getNumbersToTwenty, getEmptyNumbersObj } = require('./helpers');

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

const formatWinners = async (winners) => {
  let i = 0;
  for (const winner of winners) {
    const client = await Client.findOne({ where: { id: winner.clientId }});
    const seller = await User.findOne({ where: { id: client.dataValues.userId }});
    winners[i] = {
      n1: winners[i].n1,
      n2: winners[i].n2,
      n3: winners[i].n3,
      n4: winners[i].n4,
      clientId: client.dataValues.id,
      clientName: client.dataValues.name,
      sellerId: seller.dataValues.id,
      sellerName: seller.dataValues.name
    }
    i++;
  }
  return winners;
}

const post = async (req, res) => {
  try {
    const currentLottery = await Lottery.findOne({where: { current: true}});
    const plays = await Play.findAll({ where: { lotteryId: currentLottery.id } });

    const numbersToTen = getNumbersToTen(req.body);
    const numbersToTwenty = getNumbersToTwenty(req.body);

    const winnersWith2 = [];
    const winnersWith3 = [];
    const winnersWith4 = [];

    console.log(numbersToTen);
    plays.forEach(play => {
      const playNumbers = [play.dataValues.n1, play.dataValues.n2, play.dataValues.n3, play.dataValues.n4];
      console.log(playNumbers);
      let matches = 0;

      playNumbers.forEach((number) => {
        if (numbersToTen.includes(number)) {
          matches++;
        }
      });

      if (matches === 2) {
        winnersWith2.push(play);
      }
      if (matches === 3) {
        winnersWith3.push(play);
      }
      if (matches === 4) {
        winnersWith4.push(play);
      }

      if (matches === 3) {
        let isWinnerWith4 = false;
        playNumbers.forEach((number) => {
          if (numbersToTwenty.includes(number)) {
            isWinnerWith4 = true;
            return;
          }
        });
        if (isWinnerWith4) {
          winnersWith4.push(play);
        }
      }
    });

    await Lottery.update({
      current: false,
      // req.body tiene los 20 numeros
      ...req.body,
      date: new Date().toLocaleDateString()
    }, { where: { id: currentLottery.id } });
    

    await Lottery.create({
      ...getEmptyNumbersObj(), 
      date: new Date().toLocaleDateString(),
      current: true
    });
    
    return res.status(201).json({
      lottery: {...req.body, date: new Date().toLocaleDateString()},
      winners: {
        with2: await formatWinners(winnersWith2),
        with3: await formatWinners(winnersWith3),
        with4: await formatWinners(winnersWith4),
      }
    });
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
