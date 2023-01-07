import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthLoginReqDto } from './dto/auth.dto';
import { AuthTokens } from './interfaces/auth.interfaces';

import { ParseRequestUser } from '@/common/decorators/parse-request-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @ApiOperation({
    description: 'test',
    
  })
  @Auth({ isPublic: true })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthLoginReqDto): Promise<AuthTokens> {
    return this.authService.login(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@ParseRequestUser('username') username: string): Promise<void> {
    return this.authService.logout(username);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @ParseRequestUser('username') username: string,
    @ParseRequestUser('refreshToken') refreshToken: string
  ): Promise<any> {
    return this.authService.refresh(username, refreshToken);
  }
}
