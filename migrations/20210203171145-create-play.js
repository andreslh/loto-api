'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Plays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      lotteryId: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
      },
      clientId: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: true
      },
      clientName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
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
    await queryInterface.dropTable('Plays');
  },
};
