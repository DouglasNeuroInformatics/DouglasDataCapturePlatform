import { mockAuthLoginResDto } from '../stubs/auth.stubs';

export const AuthService = jest.fn().mockReturnValue({
  login: jest.fn().mockResolvedValue(mockAuthLoginResDto),
  logout: jest.fn(),
  refresh: jest.fn()
});
