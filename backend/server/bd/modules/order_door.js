const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "user",
    {
      id_order: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      id_door: {
        type: DataTypes.INTEGER,
      },
      id_user: {
        type: DataTypes.INTEGER,
      },
      trek_number: {
        type: DataTypes.STRING,
      },
      pick_up_point: {
        type: DataTypes.TEXT,
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
