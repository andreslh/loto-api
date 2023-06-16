'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lotteries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      current: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      n1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n4: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n5: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n6: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n7: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n8: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n9: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n10: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n11: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n12: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n13: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n14: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n15: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n16: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n17: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n18: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n19: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      n20: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('Lotteries');
  },
};
