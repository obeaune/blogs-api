const errorHandler = (err, _req, res, _next) => {
  if (err.isJoi) return res.status(400).json({ message: err.message });
  // [for now, do not deal with other errors]
  return res.status(500).json({ message: err.message });
};

module.exports = errorHandler;