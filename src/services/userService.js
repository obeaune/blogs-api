const { User } = require('../database/models');

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
  if (alreadyExists) return undefined;
  await User.create({ displayName, email, password, image });
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
};
