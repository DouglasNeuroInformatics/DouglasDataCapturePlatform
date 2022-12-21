import Joi from 'joi';

export const authLoginRequestSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const authLoginResponseSchema = Joi.object({
  accessToken: Joi.string().required()
});