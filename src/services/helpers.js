const validateJoiSchema = (schema) => async (data) => {
  const result = await schema.validateAsync(data);
  return result;
};

const notFoundError = (message) => {
  const e = new Error(message);
  e.name = 'NotFoundError';
  throw e;
};

module.exports = { 
  validateJoiSchema,
  notFoundError,
 };