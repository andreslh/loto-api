module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Clients',
      [
        {
          name: 'Andres',
          n1: 05,
          n2: 56,
          n3: 41,
          n4: 23,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Eduardo',
          n1: 03,
          n2: 55,
          n3: 45,
          n4: 25,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ana',
          n1: 03,
          n2: 55,
          n3: 45,
          n4: 25,
          userId: 3,
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
