const Service = require('../services/loginService');

const generateToken = require('../middlewares/generateToken');

const login = async (req, res) => {
  const { email, password } = req.body;

  const response = await Service.login(email, password);
  // [can't login without all fields filled]
  if (response === 'missing') {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  // [can't login with a user that doesn't exist]
  if (response === 'invalid') {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  // [is it possible to login successfully - returns the generated token]
  const token = generateToken(email);
  return res.status(200).json({ token });
};

module.exports = login;
