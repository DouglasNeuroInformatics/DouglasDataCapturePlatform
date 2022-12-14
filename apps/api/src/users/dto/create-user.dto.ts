import { UserRole, UserType } from '@dnp/common/types';
import { IsNotEmpty, IsIn, IsString } from 'class-validator';

import { userRoles } from '../schemas/user.schema';

export class CreateUserDto implements UserType {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(userRoles)
  @IsString()
  @IsNotEmpty()
  role: UserRole
}
