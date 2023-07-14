module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Clients',
      [
        {
          name: 'Andres',
          n1: 1,
          n2: 2,
          n3: 36,
          n4: 37,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Eduardo',
          n1: 1,
          n2: 2,
          n3: 3,
          n4: 25,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Julieta',
          n1: 1,
          n2: 2,
          n3: 3,
          n4: 39,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Facundo',
          n1: 1,
          n2: 21,
          n3: 22,
          n4: 23,
          userId: 2,
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
