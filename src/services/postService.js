const { BlogPost, User, Category } = require('../database/models');

const getAll = async () => {
  const allData = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return allData;                           
};

const getById = async (id) => {
  const singlePost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return singlePost;
};

module.exports = {
  getAll,
  getById,
};
