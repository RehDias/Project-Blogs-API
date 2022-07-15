const { DataTypes } = require('sequelize');

const attr = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  name: DataTypes.STRING,
};

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', attr, { tableName: 'Categories', timestamps: false });
  return Category;
};