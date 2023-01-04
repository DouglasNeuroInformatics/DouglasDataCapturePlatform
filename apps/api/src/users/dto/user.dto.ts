import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '@dnp/common';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class BaseUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @Exclude({ toPlainOnly: true })
  password: string;
  
  @ApiProperty({ enum: UserRole })
  @IsString()
  role: string;
}
