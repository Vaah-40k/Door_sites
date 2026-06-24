const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "user",
    {
      id_user: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      midlle_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "user",
    },
  );
};
