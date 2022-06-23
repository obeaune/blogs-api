const { User } = require('../database/models');

const generateToken = require('../middlewares/generateToken');

const login = async (req, res) => {
  const { email, password } = req.body;

  // [can't login without all fields filled]
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  // [can't login with a user that doesn't exist]
  const user = await User.findOne({ where: { email, password } });
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  // [is it possible to login successfully]
  const token = generateToken(email);
  return res.status(200).json({ token });
};

module.exports = login;
