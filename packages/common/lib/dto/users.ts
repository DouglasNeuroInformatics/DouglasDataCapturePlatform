import { UserRole } from '../enums';

export interface CreateUserRequestDto {
  username: string;
  password: string;
  role: UserRole;
}
