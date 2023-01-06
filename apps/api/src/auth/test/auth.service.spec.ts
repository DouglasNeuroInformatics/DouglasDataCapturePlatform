import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { createMock } from '@golevelup/ts-jest';
import bcrypt from 'bcrypt';

import { AuthService } from '../auth.service';

import { User } from '@/users/schemas/user.schema';
import { UsersService } from '@/users/users.service';

const mockPassword = {
  plainText: 'default',
  hash: bcrypt.hashSync('default', 10)
};

const mockAdmin: User = Object.freeze({
  username: 'admin',
  password: mockPassword.hash,
  role: 'admin',
  refreshToken: 'token'
});

const mockUser: User = Object.freeze({
  username: 'user',
  password: mockPassword.hash,
  role: 'user'
});

const mockUsers = [mockAdmin, mockUser];

const MockConfigService = createMock<ConfigService>({
  getOrThrow(property: string) {
    return property;
  }
});

const MockJwtService = createMock<JwtService>({
  signAsync: () => {
    return Promise.resolve('token');
  }
});

const MockUsersService = createMock<UsersService>({
  findUser: (username: string) => {
    const resolvedUser = mockUsers.find((user) => user.username === username);
    if (resolvedUser) {
      return Promise.resolve(resolvedUser);
    }
    throw new NotFoundException();
  }
});

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
          username: mockAdmin.username,
          password: mockPassword.plainText
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

  describe('logout', () => {
    it('should call usersService.updateUser and set the refreshToken to undefined', async () => {
      await authService.logout('admin');
      expect(usersService.updateUser).toBeCalledWith('admin', { refreshToken: undefined });
    });

    it('should throw an UnauthorizedException if the user does not exist', async () => {
      await expect(authService.logout('foo')).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('should throw a BadRequestException if the user does not have a refresh token', async () => {
      await expect(authService.logout('user')).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('refresh', () => {
    it('should throw an UnauthorizedException if the user does not exist', async () => {
      await expect(authService.refresh('foo', 'token')).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });
});
