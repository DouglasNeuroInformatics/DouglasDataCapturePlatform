import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthLoginReqDto, AuthLoginResDto } from './dto/auth.dto';

import { ParseRequestUser } from '@/common/decorators/parse-request-user.decorator';
import { PublicRoute } from '@/common/decorators/public-route.decorator';
import { RefreshTokenGuard } from '@/common/guards/refresh-token.guard';

@ApiBearerAuth('accessToken')
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @PublicRoute()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthLoginReqDto): Promise<AuthLoginResDto> {
    return this.authService.login(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@ParseRequestUser('username') username: string): Promise<void> {
    return this.authService.logout(username);
  }

  // Will be handled by refresh token guard
  @PublicRoute()
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
