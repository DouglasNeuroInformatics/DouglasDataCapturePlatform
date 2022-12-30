import Joi from 'joi';

import { SubjectDto } from './subjects.dto';
import { Sex } from './subjects.enums';

export const subjectDtoSchema = Joi.object<SubjectDto, true>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  sex: Joi.string()
    .valid(...Object.values(Sex))
    .required()
});
