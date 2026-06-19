const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "messageUser",
    {
      ID_message: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      ID_User: {
        type: DataTypes.INTEGER,
      },
      message: {
        type: DataTypes.TEXT,
      },
      status: {
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
      tableName: "messageUser",
    },
  );
};
