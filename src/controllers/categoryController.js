const { Category } = require('../database/models');

const create = async (req, res) => {
  const { name } = req.body;

  // [it is not possible to register a category without the name field]
  if (!name) return res.status(400).json({ message: '"name" is required' });

  // [it is possible to register a category successfully]
  const newCategory = await Category.create({ name });
  return res.status(201).json(newCategory);
};

const getAll = async (_req, res) => {
  const allCategories = await Category.findAll();
  return res.status(200).json(allCategories);
};

module.exports = {
  create,
  getAll,
};
