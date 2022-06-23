const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  // [it is not possible to do an operation without the token in the request]
  if (!token) return res.status(401).json({ message: 'Token not found' });

  // [cannot do an operation with the invalid token]
  try {
    jwt.verify(token, secret);
    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;
