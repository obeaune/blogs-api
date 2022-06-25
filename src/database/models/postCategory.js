module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {
      // https://sequelize.org/api/v6/class/src/associations/belongs-to-many.js~belongstomany
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
    });
  };

  return PostCategory;
};
