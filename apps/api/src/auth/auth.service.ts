import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import bcrypt from 'bcrypt';

import { AuthLoginReqDto, AuthLoginResDto } from './dto/auth.dto';
import { AuthTokens, JwtPayload } from './interfaces/auth.interfaces';

import { User } from '@/users/schemas/user.schema';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login({ username, password }: AuthLoginReqDto): Promise<any> {
    let user: User;
    try {
      user = await this.usersService.findUser(username);
    } catch (error) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user);
    await this.updateUserRefreshToken(user.username, tokens.refreshToken);
    return tokens;
  }

  logout(username: string): any {
    return;
  }

  refresh(username: string, refreshToken: string): any {
    return;
  }

  private async getTokens(user: User): Promise<AuthTokens> {
    const payload: JwtPayload = {
      username: user.username,
      role: user.role
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: this.config.getOrThrow<string>('SECRET_KEY')
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.config.getOrThrow<string>('SECRET_KEY')
      })
    ]);
    return { accessToken, refreshToken };
  }

  private async updateUserRefreshToken(username: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await this.hashRefreshToken(refreshToken);
    await this.usersService.updateUser(username, {
      refreshToken: hashedRefreshToken
    });
  }

  private async hashRefreshToken(refreshToken: string): Promise<string> {
    return bcrypt.hash(refreshToken, await bcrypt.genSalt());
  }

  /*

  async logout(username: string): Promise<void> {
    const user = await this.usersService.findUser(username);
    if (!user.refreshToken) {
      throw new BadRequestException(`User '${username} is already logged out`);
    }
    await this.usersService.updateUser(username, { refreshToken: undefined }); // change to null later
  }

  async refresh(username: string, refreshToken: string): Promise<Tokens> {
    const user = await this.usersService.findUser(username);
    if (!user.refreshToken) {
      throw new UnauthorizedException();
    }
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    const tokens = await this.getTokens(user);
    await this.updateUserRefreshToken(user.username, tokens.refreshToken);
    return tokens;
  }

  */
}
