import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';

import { InvalidCredentialsException } from './auth.exceptions';
import { AuthLoginReqDto } from './dto/auth.dto';
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

  async login({ username, password }: AuthLoginReqDto): Promise<AuthTokens> {
    const user = await this.getUser(username);

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new InvalidCredentialsException();
    }

    const tokens = await this.getTokens(user);
    await this.updateUserRefreshToken(user.username, tokens.refreshToken);
    return tokens;
  }

  async logout(username: string): Promise<void> {
    const user = await this.getUser(username);
    if (!user.refreshToken) {
      throw new BadRequestException('User is already logged out');
    }
    await this.usersService.updateUser(username, { refreshToken: undefined }); // change to null later
  }

  async refresh(username: string, refreshToken: string): Promise<AuthTokens> {
    const user = await this.getUser(username);
    if (!user.refreshToken) {
      throw new InvalidCredentialsException();
    }
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      throw new InvalidCredentialsException();
    }
    const tokens = await this.getTokens(user);
    await this.updateUserRefreshToken(user.username, tokens.refreshToken);
    return tokens;
  }

  private async getUser(username: string): Promise<User> {
    let user: User;
    try {
      user = await this.usersService.findUser(username);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new InvalidCredentialsException();
      }
      throw new InternalServerErrorException('Internal Server Error', {
        cause: error instanceof Error ? error : undefined
      });
    }
    return user;
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
}
