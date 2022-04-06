import ResponseUtils from '../utils/ResponseUtils.js';

const options = {
  abortEarly: false,    // include all errors
  allowUnknown: true,   // ignore unknown props
  stripUnknown: true    // remove unknown props
};

function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      ResponseUtils.status400(
        res,
        `Validation error: ${error.details.map(x => x.message).join(', ')}`
      );
    } else {
      req.body = value;
      next();
    }
  };
}

export default validateRequest;
