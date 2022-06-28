const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

const getAll = async () => {
  const users = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return users;
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return user;
};

const create = async (displayName, email, password, image) => {
  const alreadyExists = await User.findOne({ where: { email } });

  // [it is not possible to register with an existing email]
  if (alreadyExists) return undefined;

  // [it is possible to register a user successfully]
  await User.create({ displayName, email, password, image });
  return true;
};

const findUser = async (token) => {
  const decoded = jwt.verify(token, secret);
  const user = await User.findOne({ where: { email: decoded.data } });
  return user.id;
};

const exclude = async (token) => {
  const id = await findUser(token);

  await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  exclude,
};
