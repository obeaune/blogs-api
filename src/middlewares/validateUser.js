const Joi = require('joi');

const validateUser = (req, _res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    // https://stackoverflow.com/questions/57972358/joi-email-validation
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'br'] },
    }).required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
  }).validate({ displayName, email, password, image });

  if (error) return next(error);

  next();
};

module.exports = validateUser;