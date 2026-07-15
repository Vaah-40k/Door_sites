const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "cards",
    {
      ID_cards: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      src_img: { type: DataTypes.TEXT, allowNull: false, defaultValue: "[]" },
      title: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      size: {
        type: DataTypes.STRING,
      },
      alt: {
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
      tableName: "cards",
    },
  );
};
