import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthLoginReqDto, AuthLoginResDto } from './dto/auth.dto';

import { ParseRequestUser } from '@/common/decorators/parse-request-user.decorator';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { RefreshTokenGuard } from '@/common/guards/refresh-token.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthLoginReqDto): Promise<AuthLoginResDto> {
    return this.authService.login(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@ParseRequestUser('username') username: string): Promise<void> {
    return this.authService.logout(username);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @ParseRequestUser('username') username: string,
    @ParseRequestUser('refreshToken') refreshToken: string
  ): Promise<any> {
    return this.authService.refresh(username, refreshToken);
  }
}
