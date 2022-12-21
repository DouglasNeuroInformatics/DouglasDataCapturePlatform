import Joi from 'joi';

export const createSubjectRequestSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  sex: Joi.string().required()
  // sex: Joi.string().valid(...Object.values(Sex)).required()
});
