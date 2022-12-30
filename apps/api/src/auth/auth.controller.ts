import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { AuthRequestDto, AuthResponseDto, authRequestSchema } from '@dnp/common';

import { AuthService } from './auth.service';

import { ValidationPipe } from '@/validation/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(new ValidationPipe(authRequestSchema))
  login(@Body() authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    return this.authService.login(authRequestDto);
  }
}
