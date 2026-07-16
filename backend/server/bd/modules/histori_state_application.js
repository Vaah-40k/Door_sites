const { DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  return sequelize.define(
    "histori_state_application",
    {
      id_histori_state_application: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },

      id_group_application: {
        type: DataTypes.INTEGER,
      },
      state_fortexs_DV: {
        type: DataTypes.INTEGER,
      },
      state_flagmen_DV: {
        type: DataTypes.STRING,
      },
      state: {
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
      tableName: "histori_state_application",
    },
  );
};
