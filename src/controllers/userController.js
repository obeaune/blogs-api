const { User } = require('../database/models');

const generateToken = require('../middlewares/generateToken');

const getAll = async (_req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  if (!users) return res.status(500).json({ message: 'Something went wrong' });
  return res.status(200).json(users);
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  // [it is not possible to register with an existing email]
  const alreadyExists = await User.findOne({ where: { email } });
  if (alreadyExists) return res.status(409).json({ message: 'User already registered' });
  
  // [is it possible to register a user successfully]
  await User.create({ displayName, email, password, image });
  const token = generateToken(email);
  return res.status(201).json({ token });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
};

module.exports = {
  getAll,
  create,
  getById,
};
