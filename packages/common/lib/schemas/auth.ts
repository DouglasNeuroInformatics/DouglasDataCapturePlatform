import Joi from 'joi';

import { AuthRequestDto, AuthResponseDto } from '../dto';

export const authRequestSchema = Joi.object<AuthRequestDto>({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const authResponseSchema = Joi.object<AuthResponseDto>({
  accessToken: Joi.string().required()
});