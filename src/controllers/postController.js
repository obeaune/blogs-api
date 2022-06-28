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

const update = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const token = req.headers.authorization;

  // [go to service]
  const response = await Service.update(title, content, id, token);
  
  // [in case of post not found]
  if (response === 'nonexistent') {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  
  // [cannot edit a blogpost with another user]
  if (response === 'unauthorized') {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  
  // [cannot edit without all fields filled]
  if (response === 'missing') {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  // [it is possible to edit a blogpost successfully]
  return res.status(200).json(response);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
