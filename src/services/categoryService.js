const { Category } = require('../database/models');

const getAll = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

const create = async (name) => {
  // [it is not possible to register a category without the name field]
  if (!name) return undefined;

  // [it is possible to register a category successfully]
  const newCategory = await Category.create({ name });
  return newCategory;
};

module.exports = {
  getAll,
  create,
};
