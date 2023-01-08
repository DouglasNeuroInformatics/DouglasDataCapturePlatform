import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthLoginReqDto, AuthTokensDto } from './dto/auth.dto';

import { ParseRequestUser } from '@/common/decorators/parse-request-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Request a JSON Web Token from the server',
    summary: 'Login'
  })
  @ApiOkResponse({
    description: 'Successfully authenticated the user',
    type: AuthTokensDto
  })
  @ApiForbiddenResponse({
    description: 'Failed to authenticate the user'
  })
  @Auth({ isPublic: true })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthLoginReqDto): Promise<AuthTokensDto> {
    return this.authService.login(dto);
  }

  @ApiOperation({
    description: 'Invalidate refresh token for user. ',
    summary: 'Logout'
  })
  @ApiOkResponse({
    description: 'Successfully invalided refresh token'
  })
  @ApiUnauthorizedResponse({
    description: 'Failed to invalidate refresh token'
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@ParseRequestUser('username') username: string): Promise<void> {
    return this.authService.logout(username);
  }

  @ApiOperation({
    description: 'Request a new access token from the server',
    summary: 'Refresh'
  })
  @ApiOkResponse({
    description: 'Success fully refreshed access token',
    type: AuthTokensDto
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @ParseRequestUser('username') username: string,
    @ParseRequestUser('refreshToken') refreshToken: string
  ): Promise<AuthTokensDto> {
    return this.authService.refresh(username, refreshToken);
  }
}
