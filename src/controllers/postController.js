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

// const create = async (req, res) => {
//   const { title, content, categoryIds } = req.body;
//   // [it is not possible to register without all fields filled]
//   if (!title || !content || !categoryIds) {
//     return res.status(400).json({ message: 'Some required fields are missing' });
//   }
//   // [it is not possible to register a blogpost with a non-existent categoryIds]
//   // [it is possible to register a category successfully]
//   const newBlogPost = await BlogPost.create({ title, content, categoryIds });
//   return res.status(201).json(newBlogPost);
// };

module.exports = {
  getAll,
  getById,
  // create,
};
