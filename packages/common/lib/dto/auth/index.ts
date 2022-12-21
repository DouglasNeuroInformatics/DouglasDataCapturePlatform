import { IsNotEmpty, IsString } from 'class-validator';
import Joi from 'joi';

export class AuthLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthLoginResponseDto {
  accessToken: string;
}

export const authLoginRequestSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const authLoginResponseSchema = Joi.object({
  accessToken: Joi.string().required()
});
