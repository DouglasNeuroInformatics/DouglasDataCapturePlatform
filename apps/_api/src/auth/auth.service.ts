import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthRequestDto, AuthResponseDto, AuthTokenPayload } from '@dnp/common';
import bcrypt from 'bcrypt';

import { User } from '@/users/schemas/user.schema';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async login(authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.getUserOrThrowUnauthorized(authRequestDto.username);
    const isAuth = await bcrypt.compare(authRequestDto.password, user.password);
    if (!isAuth) {
      throw new UnauthorizedException();
    }
    const payload: AuthTokenPayload = {
      username: user.username,
      role: user.role
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async getUserOrThrowUnauthorized(username: string): Promise<User> {
    let user: User;
    try {
      user = await this.usersService.findByUsername(username);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }
      throw new InternalServerErrorException();
    }
    return user;
  }
}
