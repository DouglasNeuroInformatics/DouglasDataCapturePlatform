import { Body, Controller, Post } from '@nestjs/common';

import { AuthLoginRequestDto, AuthLoginResponseDto } from '@dnp/common/dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('login')
  login(@Body() authLoginRequestDto: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    return this.authService.login(authLoginRequestDto);
  }
  
}
