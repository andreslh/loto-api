module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Plays',
      [
        {
          n1: 05,
          n2: 56,
          n3: 41,
          n4: 23,
          lotteryId: 2,
          clientId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          n1: 05,
          n2: 56,
          n3: 41,
          n4: 23,
          lotteryId: 2,
          clientId: 2,
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
