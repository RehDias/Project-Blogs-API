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
  const Category = sequelize.define('Category', attr, {
    tableName: 'Categories',
    timestamps: false,
  });

  Category.associate = (models) => {
    Category.hasOne(models.PostCategory, { foreignKey: 'categoryId', as: 'PostCategories', onDelete: 'CASCADE' });
  };
  return Category;
};