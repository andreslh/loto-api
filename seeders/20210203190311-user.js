module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'admin@admin.com',
          name: 'Admin Ledesma',
          password:
            '$2b$10$8aKJ..HiCoOnVP6BvcnrIOD.vg1wl429cDjjtrbFFnkI3RpQqy02O',
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'seller@seller.com',
          name: 'Seller Ledesma',
          password:
            '$2b$10$8aKJ..HiCoOnVP6BvcnrIOD.vg1wl429cDjjtrbFFnkI3RpQqy02O',
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'seller3@seller.com',
          name: 'Ana Muscardin',
          password:
            '$2b$10$8aKJ..HiCoOnVP6BvcnrIOD.vg1wl429cDjjtrbFFnkI3RpQqy02O',
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};