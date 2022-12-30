import Joi from 'joi';

import { InstrumentDto } from './instruments.dto';
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

export const instrumentDtoSchema = Joi.object<InstrumentDto, true>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  fields: Joi.array().items(instrumentFieldSchema).required()
});
