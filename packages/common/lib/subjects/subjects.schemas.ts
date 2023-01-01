import Joi from 'joi';

import { SubjectGetResponseDto, SubjectPostRequestDto, SubjectPostResponseDto } from './subjects.dto';
import { Sex } from './subjects.enums';

export const subjectGetResponseSchema = Joi.object<SubjectGetResponseDto, true>({
  _id: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  sex: Joi.string()
    .valid(...Object.values(Sex))
    .required()
});

export const subjectPostRequestSchema = Joi.object<SubjectPostRequestDto, true>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  sex: Joi.string()
    .valid(...Object.values(Sex))
    .required()
});

export const subjectPostResponseSchema = Joi.object<SubjectPostResponseDto, true>({
  _id: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  sex: Joi.string()
    .valid(...Object.values(Sex))
    .required()
});
