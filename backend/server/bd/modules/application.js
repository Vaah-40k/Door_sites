const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "application",
    {
      id_application: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      id_user: {
        type: DataTypes.INTEGER,
      },
      id_group_application: {
        type: DataTypes.INTEGER,
      },
      Id_tovar: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.TEXT,
      },
      full_price: {
        type: DataTypes.INTEGER,
      },

      adress: {
        type: DataTypes.TEXT,
        defaultValue: "хуй твой",
      },
      title: {
        type: DataTypes.TEXT,
      },
      size: {
        type: DataTypes.TEXT,
      },
      src_img: {
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
      tableName: "application",
    },
  );
};
