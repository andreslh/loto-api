module.exports = (sequelize, DataTypes) => {
  const Lottery = sequelize.define(
    'Lottery',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      current: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      n1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n3: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n4: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n5: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n6: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n7: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n8: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n9: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n10: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n11: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n12: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n13: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n14: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n15: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n16: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n17: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n18: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n19: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      n20: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  return Lottery;
};