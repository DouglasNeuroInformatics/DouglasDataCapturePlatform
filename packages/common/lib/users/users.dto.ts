import { UserRole } from './users.enums';

export interface CreateUserRequestDto {
  username: string;
  password: string;
  role: UserRole;
}
