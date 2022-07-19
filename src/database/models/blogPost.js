const { DataTypes } = require('sequelize');

const attr = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  title: DataTypes.STRING,

  content: DataTypes.TEXT,

  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
  },

  published: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  updated: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', attr, {
    tableName: 'BlogPosts',
    createdAt: 'published',
    updatedAt: 'updated'
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    BlogPost.hasMany(models.PostCategory, { foreignKey: 'postId', as: 'PostCategories' });
  };

  return BlogPost;
};