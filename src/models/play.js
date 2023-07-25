module.exports = (sequelize, DataTypes) => {
  const Play = sequelize.define(
    'Play',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      n1: {
        type: DataTypes.INTEGER,
      },
      n2: {
        type: DataTypes.INTEGER,
      },
      n3: {
        type: DataTypes.INTEGER,
      },
      n4: {
        type: DataTypes.INTEGER,
      },
      lotteryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
      },
      clientName: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
    },
    {}
  );
  Play.associate = function (models) {
    Play.belongsTo(models.Client, {
      foreignKey: 'clientId',
      onDelete: 'CASCADE',
    });
    Play.belongsTo(models.Lottery, {
      foreignKey: 'lotteryId',
      onDelete: 'CASCADE',
    });
  };
  return Play;
};
