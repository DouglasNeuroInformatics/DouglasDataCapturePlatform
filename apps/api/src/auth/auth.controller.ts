import { Body, Controller, Post } from '@nestjs/common';

import { AuthCredentialsDto } from '@dnp/common/dto';

import { AuthCredentialsResponse } from './auth.interfaces';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<AuthCredentialsResponse> {
    return this.authService.login(authCredentialsDto);
  }
}
