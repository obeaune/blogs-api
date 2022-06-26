const Service = require('../services/postService');

const getAll = async (_req, res) => {
  const response = await Service.getAll();
  return res.status(200).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await Service.getById(id);
  if (!response) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(response);
};

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

  // [go to service]
  const response = await Service.create(title, content, categoryIds, token);

  // [if some fields are missing]
  if (response === 'missing') {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  // [if some categories are invalid]
  if (response === 'invalid') {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  // [success]
  return res.status(201).json(response);
};

module.exports = {
  getAll,
  getById,
  create,
};
