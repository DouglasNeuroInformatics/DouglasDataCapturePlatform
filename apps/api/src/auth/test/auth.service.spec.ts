import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { AuthService } from '../auth.service';

import { MockConfigService } from './mocks/config.service.mock';
import { MockJwtService } from './mocks/jwt.service.mock';
import { MockUsersService } from './mocks/users.service.mock';

import { UsersService } from '@/users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: MockConfigService
        },
        {
          provide: JwtService,
          useValue: MockJwtService
        },
        {
          provide: UsersService,
          useValue: MockUsersService
        }
      ]
    }).compile();

    authService = moduleRef.get(AuthService);
    usersService = moduleRef.get(UsersService);
  });

  describe('login', () => {
    it('should return tokens and update refresh token if the user provides valid credentials', async () => {
      await expect(
        authService.login({
          username: 'admin',
          password: 'default'
        })
      ).resolves.toStrictEqual({
        accessToken: 'token',
        refreshToken: 'token'
      });
      expect(usersService.updateUser).toBeCalledWith(
        'admin',
        expect.objectContaining({
          refreshToken: expect.not.stringMatching('token')
        })
      );
    });

    it('should throw an UnauthorizedException if the user does not exist', async () => {
      await expect(
        authService.login({
          username: 'attacker',
          password: 'foo'
        })
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('should throw an UnauthorizedException if the user provides an incorrect password', async () => {
      await expect(
        authService.login({
          username: 'admin',
          password: 'error'
        })
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });
});
