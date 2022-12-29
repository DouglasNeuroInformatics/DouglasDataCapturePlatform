import Joi from 'joi';

import { Sex } from './subjects.enums';

export const createSubjectRequestSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  sex: Joi.string().valid(...Object.values(Sex)).required()
});
