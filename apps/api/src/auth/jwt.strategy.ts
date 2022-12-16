import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../users/schemas/user.schema';

import { JwtPayload } from './auth.interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'default'
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.authService.getUserOrThrowUnauthorized(payload.username);
  }
}