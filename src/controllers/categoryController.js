const { Category } = require('../database/models');

const login = async (req, res) => {
  const { name } = req.body;

  // [it is not possible to register a category without the name field]
  if (!name) return res.status(400).json({ message: '"name" is required' });

  // [it is possible to register a category successfully]
  const newCategory = await Category.create({ name });
  return res.status(201).json(newCategory);
};

module.exports = login;
