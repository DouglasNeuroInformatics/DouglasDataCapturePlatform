import { IsString } from 'class-validator';

export class AuthLoginReqDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
