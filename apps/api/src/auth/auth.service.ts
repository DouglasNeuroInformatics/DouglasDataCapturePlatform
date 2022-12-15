import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';

import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

import { AuthCredentialsResponse, JwtPayload } from './auth.interfaces';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async login(authCredentialsDto: AuthCredentialsDto): Promise<AuthCredentialsResponse> {
    const user = await this.getUserOrThrowUnauthorized(authCredentialsDto.username);
    const isAuth = await bcrypt.compare(authCredentialsDto.password, user.password);
    if (!isAuth) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = { username: authCredentialsDto.username };
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
