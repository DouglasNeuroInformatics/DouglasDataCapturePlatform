import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'default',
      signOptions: {
        expiresIn: 3600 // 1 hour
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule, PassportModule]
})
export class AuthModule {}
