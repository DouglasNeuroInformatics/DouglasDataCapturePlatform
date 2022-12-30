import Joi from 'joi';

import { CreateSubjectRequestDto } from './subjects.dto';
import { Sex } from './subjects.enums';

export const createSubjectRequestSchema = Joi.object<CreateSubjectRequestDto, true>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  sex: Joi.string()
    .valid(...Object.values(Sex))
    .required()
});
