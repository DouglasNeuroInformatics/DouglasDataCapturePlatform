import { IsNotEmpty, IsEnum, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import Joi from 'joi';

import { UserRole } from '../../enums/index.js';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @Matches(/[a-z]/, { message: 'password must contain at least one lower case letter' })
  @Matches(/[A-Z]/, { message: 'password must contain at least one upper case letter' })
  @Matches(/\d/, { message: 'password must contain at least one number' })
  @MaxLength(32)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export const createUserRequestSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).max(32).regex(/[a-z]/).regex(/[A-Z]/).regex(/\d/).required(),
  role: Joi.string().required()
  // role: Joi.string().valid(Object.values(UserRole)).required()
});