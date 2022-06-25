const { User } = require('../database/models');

const login = async (email, password) => {
  // [can't login without all fields filled]
  if (!email || !password) return ('missing');

  // [can't login with a user that doesn't exist]
  const user = await User.findOne({ where: { email, password } });
  if (!user || user.password !== password) return ('invalid');
};

module.exports = {
  login,
};
