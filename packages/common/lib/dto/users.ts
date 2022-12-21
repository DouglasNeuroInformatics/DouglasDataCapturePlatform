import { UserRole } from '../enums/index';

export interface CreateUserRequestDto {
  username: string;
  password: string;
  role: UserRole;
}
