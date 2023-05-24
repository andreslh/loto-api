module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    {}
  );
  return Client;
};
