import { Request } from 'express';

import { AuthLoginReqDto } from '@/auth/dto/auth.dto';

export const mockAuthLoginReqDto: AuthLoginReqDto = Object.freeze({
  username: 'admin',
  password: 'default'
});

export const mockAuthLogoutRequest: Partial<Request> = {
  user: {
    username: 'admin',
    role: 'admin'
  }
};
