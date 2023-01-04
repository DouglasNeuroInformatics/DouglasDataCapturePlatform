import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateUserReqDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  role: 'admin' | 'user';
}

export class CreateUserResDto extends PartialType(OmitType(CreateUserReqDto, ['password'] as const)) {}
