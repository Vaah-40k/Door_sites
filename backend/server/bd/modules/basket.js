const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "basket",
    {
      id_basket: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      id_user: {
        type: DataTypes.INTEGER,
      },
      Id_tovar: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      full_price: {
        type: DataTypes.INTEGER,
      },
      selected: {
        type: DataTypes.TINYINT,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "basket",
    },
  );
};
