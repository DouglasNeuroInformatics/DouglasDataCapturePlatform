import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthLoginResponseDto {
  accessToken: string;
}
