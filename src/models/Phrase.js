const { DataTypes } = require("sequelize");
const sequelize = require("./database.js");

const Phrase = sequelize.define(
  "Phrase",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lang: {
      // type: DataTypes.CHAR(3),
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "phrases",
    timestamps: false,
  }
);

module.exports = Phrase;
