import Joi from 'joi';

import { UserRole } from './users.enums';

export const createUserRequestSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).max(32).regex(/[a-z]/).regex(/[A-Z]/).regex(/\d/).required(),
  role: Joi.string().valid(...Object.values(UserRole)).required()
});
