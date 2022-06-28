const jwt = require('jsonwebtoken');
const { BlogPost, User, Category, PostCategory } = require('../database/models');

const secret = process.env.JWT_SECRET;

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

// AUXILIARY FUNCTIONS TO CREATE
const validateCategories = async (arrIds) => {
  const allCategories = await Category.findAll();
  const categoriesIds = allCategories.map(({ dataValues: { id } }) => id);
  const result = arrIds.every((id) => categoriesIds.includes(id));
  if (!result) return undefined;
  return true;
};

// AUXILIARY FUNCTIONS TO CREATE
const findUser = async (token) => {
  const decoded = jwt.verify(token, secret);
  const user = await User.findOne({ where: { email: decoded.data } });
  return user.id;
};

const create = async (title, content, categoryIds, token) => {
  // [it is not possible to register without all fields filled]
  if (!title || !content || !categoryIds) return 'missing';

  // [it is not possible to register a blogpost with a non-existent categoryIds]
  const validCategoryIds = await validateCategories(categoryIds);
  if (!validCategoryIds) return 'invalid';

  // [it is possible to register a blogPost successfully]
  const userId = await findUser(token);
  const dateTime = new Date();
  const newBlogPost = await BlogPost
    .create({ title, content, userId, published: dateTime, updated: dateTime });
  
  // [populating the postCategory]
  const postId = newBlogPost.id;
  categoryIds.forEach((categoryId) => PostCategory.create({ postId, categoryId }));

  // [return the created post]
  const resp = await BlogPost.findByPk(postId);
  return resp;
};

const update = async (title, content, id, token) => {
  // [find out if the post exists]
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) return ('nonexistent');

  // [cannot edit a blogpost with another user]
  const userId = await findUser(token);
  if (userId !== post.userId) return 'unauthorized';

  // [cannot edit without all fields filled]
  if (!title || !content) return 'missing';

  // [it is possible to edit a blogpost successfully]
  const date = new Date();
  await BlogPost.update({ title, content, updated: date }, { where: { id } });
  const postUpdated = await getById(id);
  return postUpdated;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
