import { UserRole } from '../users';

export interface AuthTokenPayload {
  username: string;
  role: UserRole
}
