const { DataTypes } = require('sequelize');

const attr = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  displayName: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: DataTypes.STRING,
};

module.exports = (sequelize) => {
  const User = sequelize.define('User', attr, { tableName: 'Users', timestamps: false });
  return User;
};