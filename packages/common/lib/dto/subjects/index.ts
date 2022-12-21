import { Type } from 'class-transformer';
import { IsNotEmpty, IsEnum, IsString, IsDate } from 'class-validator';
import Joi from 'joi';

import { Sex } from '../../enums/index.js';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsEnum(Sex)
  sex: Sex;
}

export const createSubjectRequestSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  sex: Joi.string().required()
  // sex: Joi.string().valid(...Object.values(Sex)).required()
});
