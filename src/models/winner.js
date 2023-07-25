module.exports = (sequelize, DataTypes) => {
  const Winner = sequelize.define(
    'Winner',
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
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
      },
      sellerName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      numbersMatchCount: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
      },
    },
    {}
  );
  Winner.associate = function (models) {
    Winner.belongsTo(models.Lottery, {
      foreignKey: 'lotteryId',
      onDelete: 'CASCADE',
    });
  };
  return Winner;
};
