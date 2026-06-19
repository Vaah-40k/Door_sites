const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "all_door",
    {
      id_door: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
      },
      width: {
        type: DataTypes.STRING,
      },
      height: {
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
      tableName: "all_door",
    },
  );
};
