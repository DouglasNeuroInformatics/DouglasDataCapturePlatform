import Joi from 'joi';

import { CreateInstrumentRequestDto, UpdateInstrumentRequestDto } from './instruments.dto';
import { InstrumentField } from './instruments.interfaces';

export const instrumentFieldSchema = Joi.object<InstrumentField>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  isRequired: Joi.boolean().required(),
  type: Joi.string().valid('')
});

export const createInstrumentRequestSchema = Joi.object<CreateInstrumentRequestDto>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  fields: Joi.array().items(instrumentFieldSchema)
});

export const updateInstrumentRequestSchema = Joi.object<UpdateInstrumentRequestDto>({});
