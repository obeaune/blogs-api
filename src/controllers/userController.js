const Service = require('../services/userService');

const generateToken = require('../middlewares/generateToken');

const getAll = async (_req, res) => {
  const response = await Service.getAll();
  
  // [in case something went wrong]
  if (!response) return res.status(500).json({ message: 'Something went wrong' });

  // [it is possible to list all users]
  return res.status(200).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const response = await Service.getById(id);

  // [cannot list a non-existent user]
  if (!response) return res.status(404).json({ message: 'User does not exist' });

  // [it is possible to list a specific user successfully]
  return res.status(200).json(response);
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const response = await Service.create(displayName, email, password, image);

  // [it is not possible to register with an existing email]
  if (!response) return res.status(409).json({ message: 'User already registered' });
  
  // [it is possible to register a user successfully]
  const token = generateToken(email);
  return res.status(201).json({ token });
};

module.exports = {
  getAll,
  getById,
  create,
};
