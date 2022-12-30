import Joi from 'joi';

import { CreateInstrumentRequestDto, UpdateInstrumentRequestDto } from './instruments.dto';
import { InstrumentFieldType } from './instruments.enums';
import { InstrumentFieldInterface } from './instruments.interfaces';

export const instrumentFieldSchema = Joi.object<InstrumentFieldInterface, true>({
  name: Joi.string().required(),
  label: Joi.string().required(),
  isRequired: Joi.boolean().required(),
  type: Joi.string()
    .valid(...Object.values(InstrumentFieldType))
    .required()
});

export const createInstrumentRequestSchema = Joi.object<CreateInstrumentRequestDto, true>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  fields: Joi.array().items(instrumentFieldSchema).required()
});

export const updateInstrumentRequestSchema = Joi.object<UpdateInstrumentRequestDto>({});
