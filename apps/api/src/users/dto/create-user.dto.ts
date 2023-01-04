import { ApiProperty, OmitType } from '@nestjs/swagger';

import { UserRole } from '@dnp/common';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUserReqDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRole })
  @IsString()
  role: string;
}

export class CreateUserResDto extends CreateUserReqDto {
  //@Exclude()
  password: string;
}

// OmitType(CreateUserReqDto, ['password'] as const) {}
