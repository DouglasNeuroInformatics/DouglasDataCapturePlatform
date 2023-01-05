import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import bcrypt from 'bcrypt';

import { AuthLoginReqDto, AuthLoginResDto } from './dto/auth.dto';

import { User } from '@/users/schemas/user.schema';
import { UsersService } from '@/users/users.service';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async login(dto: AuthLoginReqDto): Promise<AuthLoginResDto> {
    const user = await this.getUserOrThrowUnauthorized(dto.username);
    const isAuth = await bcrypt.compare(dto.password, user.password);
    if (!isAuth) {
      throw new UnauthorizedException();
    }
    const tokens = await this.getTokens(user);
    await this.updateUserRefreshToken(user.username, tokens.refreshToken);
    return tokens;
  }

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

  private async getUserOrThrowUnauthorized(username: string): Promise<User> {
    try {
      return this.usersService.findUser(username);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }
      throw new InternalServerErrorException();
    }
  }

  private async getTokens(user: User): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([this.getAccessToken(user), this.getRefreshToken(user)]);
    return { accessToken, refreshToken };
  }

  private async getAccessToken(user: User): Promise<string> {
    return this.getToken(user, {
      expiresIn: 60 * 15,
      secret: 'at-secret'
    });
  }

  private async getRefreshToken(user: User): Promise<string> {
    return this.getToken(user, {
      expiresIn: 60 * 60 * 24 * 7,
      secret: 'rt-secret'
    });
  }

  private async getToken(user: User, options: JwtSignOptions): Promise<string> {
    return this.jwtService.signAsync(
      {
        username: user.username,
        role: user.role,
        refreshToken: user.refreshToken
      },
      options
    );
  }

  private async hashRefreshToken(refreshToken: string): Promise<string> {
    return bcrypt.hash(refreshToken, 10);
  }

  private async updateUserRefreshToken(username: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await this.hashRefreshToken(refreshToken);
    await this.usersService.updateUser(username, {
      refreshToken: hashedRefreshToken
    });
  }
}
