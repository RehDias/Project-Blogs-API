const { DataTypes } = require('sequelize');

const attr = {
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'BlogPosts',
      key: 'id'
    }
  },

  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  }
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory', attr, { tableName: 'PostCategories', timestamps: false });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'Categories',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};