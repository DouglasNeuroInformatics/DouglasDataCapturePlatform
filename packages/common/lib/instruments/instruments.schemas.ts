import Joi from 'joi';

import { InstrumentGetResponseDto, InstrumentPostRequestDto, InstrumentPostResponseDto } from './instruments.dto';
import { InstrumentFieldType } from './instruments.enums';
import { InstrumentField } from './instruments.interfaces';

export const instrumentFieldSchema = Joi.object<InstrumentField, true>({
  name: Joi.string().required(),
  label: Joi.string().required(),
  isRequired: Joi.boolean().required(),
  type: Joi.string()
    .valid(...Object.values(InstrumentFieldType))
    .required()
});

export const instrumentGetResponseSchema = Joi.object<InstrumentGetResponseDto, true>({
  _id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  fields: Joi.array().items(instrumentFieldSchema).required()
});

export const instrumentPostRequestSchema = Joi.object<InstrumentPostRequestDto, true>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  fields: Joi.array().items(instrumentFieldSchema).required()
});

export const instrumentPostResponseSchema = Joi.object<InstrumentPostResponseDto, true>({
  _id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  fields: Joi.array().items(instrumentFieldSchema).required()
});
