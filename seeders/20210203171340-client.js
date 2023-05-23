module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Clients',
      [
        {
          name: 'Andres',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Eduardo',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', null, {});
  },
};
