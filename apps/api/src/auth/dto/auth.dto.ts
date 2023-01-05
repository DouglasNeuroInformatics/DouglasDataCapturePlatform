import { IsString } from 'class-validator';

export class AuthLoginReqDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class AuthLoginResDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
