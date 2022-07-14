const statusErrors = {
  NotFoundError: 400,
  ValidationError: 400,
};

const errorHandler = ({ name, message }, _req, res, _next) => {
  const code = statusErrors[name];
  if (!code) return res.status(500).json({ message });
  res.status(code).json({ message });
};

module.exports = errorHandler;