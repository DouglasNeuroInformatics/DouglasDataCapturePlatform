import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { AuthService } from './auth.service';
import { AuthLoginReqDto, AuthLoginResDto } from './dto/auth.dto';

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
  logout(@Req() req: Request): Promise<void> {
    const user: any = req.user; // VALIDATE
    console.log(user);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.authService.logout(user.username);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Req() req: Request): Promise<any> {
    const user: any = req.user; // VALIDATE
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.authService.refresh(user.username, user.refreshToken);
  }
}
