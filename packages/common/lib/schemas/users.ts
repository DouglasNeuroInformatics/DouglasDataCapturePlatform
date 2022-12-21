import Joi from 'joi';

export const createUserRequestSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).max(32).regex(/[a-z]/).regex(/[A-Z]/).regex(/\d/).required(),
  role: Joi.string().required()
  // role: Joi.string().valid(Object.values(UserRole)).required()
});