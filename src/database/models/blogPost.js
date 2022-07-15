const { DataTypes } = require('sequelize');

const attr = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  title: DataTypes.STRING,

  content: DataTypes.STRING,

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
  },

  published: DataTypes.DATE,

  updated: DataTypes.DATE,
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', attr, { tableName: 'BlogPosts', timestamps: false });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'Users' })
  };

  return BlogPost;
};