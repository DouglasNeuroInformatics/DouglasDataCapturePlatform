import { Test } from '@nestjs/testing';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

import { mockAuthLoginReqDto } from './stubs/auth.stubs';

jest.mock('../auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    authController = moduleRef.get(AuthController);
    authService = moduleRef.get(AuthService);
  });

  describe('login', () => {
    it('should call authService.login', async () => {
      await authController.login(mockAuthLoginReqDto);
      expect(authService.login).toBeCalled();
    });
  });

  describe('logout', () => {
    it('should call authService.logout', async () => {
      await authController.logout('admin');
      expect(authService.logout).toBeCalledWith('admin');
    });
  });

  describe('refresh', () => {
    it('should call authService.refresh', async () => {
      await authController.refresh('admin', 'refresh-token');
      expect(authService.refresh).toBeCalledWith('admin', 'refresh-token');
    });
  });
});
