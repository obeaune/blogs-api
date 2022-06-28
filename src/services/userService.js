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

  // [it is not possible to register with an existing email]
  if (alreadyExists) return undefined;

  // [it is possible to register a user successfully]
  await User.create({ displayName, email, password, image });
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
};
