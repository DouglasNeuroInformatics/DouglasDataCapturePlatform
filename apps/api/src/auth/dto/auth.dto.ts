import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class AuthLoginReqDto {
  @ApiProperty({
    example: 'Admin'
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'Password123'
  })
  @IsString()
  password: string;
}

export class AuthTokensDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczMjE0NTk3LCJleHAiOjE2NzMyMTU0OTd9.Uqg_IqLIzLrgBQQjChc413ya_HH3G6LZIlkglaO2NxA'
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczMjE0NTk3LCJleHAiOjE2NzM4MTkzOTd9.q90rFhIRJcFadhF8yCI7IrZhfyZ_WOenkZZ9bT_2za8'
  })
  refreshToken: string;
}
