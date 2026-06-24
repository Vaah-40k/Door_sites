const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "test_card_tovara",
    {
      ID_card: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      descriprion_primary: {
        type: DataTypes.INTEGER,
      },
      description_secundus: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "test_card_tovara",
    },
  );
};
