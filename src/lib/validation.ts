import Joi from 'joi';

export const loginSchema = Joi.object({
  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.empty': 'Mobile number is required',
      'string.length': 'Mobile number must be exactly 10 digits',
      'string.pattern.base': 'Mobile number must contain only digits',
    }),
});
