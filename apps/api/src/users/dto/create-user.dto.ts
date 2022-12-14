import { UserRole, UserType } from '@dnp/common/types';
import { IsNotEmpty, IsIn, IsString, MinLength, MaxLength, Matches } from 'class-validator';

import { userRoles } from '../schemas/user.schema';

export class CreateUserDto implements UserType {
  @IsString()
  @IsNotEmpty()
  username: string;

  @Matches(/[a-z]/, { message: 'password must contain at least one lower case letter' })
  @Matches(/[A-Z]/, { message: 'password must contain at least one upper case letter' })
  @Matches(/\d/, { message: 'password must contain at least one number' })
  @MaxLength(32)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(userRoles)
  @IsString()
  @IsNotEmpty()
  role: UserRole;
}
