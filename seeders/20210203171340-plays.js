module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Plays',
      [
        {
          n1: 1,
          n2: 2,
          n3: 36,
          n4: 37,
          lotteryId: 2,
          clientId: 1,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          n1: 1,
          n2: 2,
          n3: 3,
          n4: 25,
          lotteryId: 2,
          clientId: 2,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          n1: 1,
          n2: 2,
          n3: 3,
          n4: 39,
          lotteryId: 2,
          clientId: 3,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          n1: 1,
          n2: 21,
          n3: 22,
          n4: 23,
          lotteryId: 2,
          clientId: 4,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Plays', null, {});
  },
};
