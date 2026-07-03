const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "administrator",
    {
      ID_administrator: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
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
    },
    {
      tableName: "administrators",
      timestamps: false,
    },
  );
};
