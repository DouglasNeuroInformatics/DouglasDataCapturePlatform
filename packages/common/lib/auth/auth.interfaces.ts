import { UserRole } from '../users';

export interface AuthTokenPayload {
  username: string;
  role: UserRole;
}

export interface JwtPayload {
  username: string;
  role: UserRole;
  refreshToken?: string;
}
