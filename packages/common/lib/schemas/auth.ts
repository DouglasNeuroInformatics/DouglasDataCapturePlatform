import Joi from 'joi';

import { AuthRequestDto, AuthResponseDto } from '../dto';
import { AuthTokenPayload } from '../interfaces';

export const authRequestSchema = Joi.object<AuthRequestDto>({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const authResponseSchema = Joi.object<AuthResponseDto>({
  accessToken: Joi.string().required()
});

export const authTokenPayloadSchema = Joi.object<AuthTokenPayload>({
  username: Joi.string().required()
});
