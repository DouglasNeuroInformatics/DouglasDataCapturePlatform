import { Request } from 'express';

import { AuthLoginReqDto, AuthLoginResDto } from '@/auth/dto/auth.dto';

export const mockAuthLoginReqDto: AuthLoginReqDto = Object.freeze({
  username: 'admin',
  password: 'default'
});

export const mockAuthLoginResDto: AuthLoginResDto = Object.freeze({
  accessToken: 'token',
  refreshToken: 'token'
});

export const mockAuthLogoutRequest: Partial<Request> = {
  user: {
    username: 'admin',
    role: 'admin'
  }
};
