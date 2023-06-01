'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: false,
      },
      n1: {
        type: Sequelize.INTEGER,
        unique: false,
      },
      n2: {
        type: Sequelize.INTEGER,
        unique: false,
      },
      n3: {
        type: Sequelize.INTEGER,
        unique: false,
      },
      n4: {
        type: Sequelize.INTEGER,
        unique: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clients');
  },
};
