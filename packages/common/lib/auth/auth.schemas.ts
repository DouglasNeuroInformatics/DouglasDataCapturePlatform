import Joi from 'joi';

import { UserRole } from '../users';

import { AuthRequestDto, AuthResponseDto } from './auth.dto';
import { AuthTokenPayload } from './auth.interfaces';

export const authRequestSchema = Joi.object<AuthRequestDto, true>({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const authResponseSchema = Joi.object<AuthResponseDto, true>({
  accessToken: Joi.string().required()
});

export const authTokenPayloadSchema = Joi.object<AuthTokenPayload, true>({
  username: Joi.string().required(),
  role: Joi.string().valid(...Object.values(UserRole)).required()
});
