const Service = require('../services/categoryService');

const getAll = async (_req, res) => {
  const response = await Service.getAll();
  return res.status(200).json(response);
};

const create = async (req, res) => {
  const { name } = req.body;
  const response = await Service.create(name);
  if (!response) return res.status(400).json({ message: '"name" is required' });
  return res.status(201).json(response);
};

module.exports = {
  getAll,
  create,
};
