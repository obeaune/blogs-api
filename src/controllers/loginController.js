const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const router = express.Router();

const secret = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
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
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ data: user.email }, secret, jwtConfig);
  res.status(200).json({ token });
});

module.exports = router;
