import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { AuthLoginRequestDto, AuthLoginResponseDto } from '@dnp/common/dto';
import { authLoginRequestSchema } from '@dnp/common/schemas';

import { ValidationPipe } from '../validation/validation.pipe';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('login')
  @UsePipes(new ValidationPipe(authLoginRequestSchema))
  login(@Body() authLoginRequestDto: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    return this.authService.login(authLoginRequestDto);
  }
  
}
