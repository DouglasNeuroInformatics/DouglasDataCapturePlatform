import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthLoginRequestDto, AuthLoginResponseDto } from '@dnp/common/dto';
import bcrypt from 'bcrypt';

import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async login(authLoginRequestDto: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    const user = await this.getUserOrThrowUnauthorized(authLoginRequestDto.username);
    const isAuth = await bcrypt.compare(authLoginRequestDto.password, user.password);
    if (!isAuth) {
      throw new UnauthorizedException();
    }
    const payload = { username: authLoginRequestDto.username };
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
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }
}
