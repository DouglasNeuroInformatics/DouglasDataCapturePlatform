import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
