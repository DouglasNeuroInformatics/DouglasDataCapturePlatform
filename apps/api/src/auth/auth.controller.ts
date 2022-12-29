
import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { AuthRequestDto, AuthResponseDto } from '@dnp/common';
import { authRequestSchema } from '@dnp/common';

import { ValidationPipe } from '../validation/validation.pipe';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post()
  @UsePipes(new ValidationPipe(authRequestSchema))
  login(@Body() authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    return this.authService.login(authRequestDto);
  }
  
}
