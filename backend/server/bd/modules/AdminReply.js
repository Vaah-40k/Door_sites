const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "admin_reply",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      ID_User: { type: DataTypes.INTEGER, allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "admin_reply",
    },
  );
};
