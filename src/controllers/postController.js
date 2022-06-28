const Service = require('../services/postService');

const getAll = async (_req, res) => {
  const response = await Service.getAll();
  return res.status(200).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const response = await Service.getById(id);

  // [unable to list a non-existent blogpost]
  if (!response) return res.status(404).json({ message: 'Post does not exist' });

  // [it is possible to list a blogpost successfully]
  return res.status(200).json(response);
};

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization;

  const response = await Service.create(title, content, categoryIds, token);

  // [it is not possible to register without all fields filled]
  if (response === 'missing') {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  // [it is not possible to register a blogpost with a non-existent categoryIds]
  if (response === 'invalid') {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  // [it is possible to register a blogPost successfully]
  return res.status(201).json(response);
};

const update = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const token = req.headers.authorization;

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

const exclude = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const response = await Service.exclude(id, token);

  // [cannot delete a blogpost with another user]
  if (response === 'unauthorized') return res.status(401).json({ message: 'Unauthorized user' });
  
  // [in case of post not found]
  if (response === 'nonexistent') return res.status(404).json({ message: 'Post does not exist' });
  
  // [it is possible to delete a blogpost successfully]
  return res.status(204).json();
};

const search = async (req, res) => {
  const { q } = req.query;

  const response = await Service.search(q);  

  return res.status(200).json(response);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  search,
};
