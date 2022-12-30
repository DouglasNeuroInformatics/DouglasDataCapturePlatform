import Joi from 'joi';

import { CreateSubjectRequestDto } from './subjects.dto';
import { Sex } from './subjects.enums';
import { SubjectInterface } from './subjects.interfaces';

export const createSubjectRequestSchema = Joi.object<CreateSubjectRequestDto, true>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  sex: Joi.string()
    .valid(...Object.values(Sex))
    .required()
});

export const subjectSchema = Joi.object<SubjectInterface, true>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  sex: Joi.string()
    .valid(...Object.values(Sex))
    .required()
});

export const subjectsArraySchema = Joi.array<SubjectInterface[]>().items(subjectSchema);