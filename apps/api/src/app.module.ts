import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { loadConfig } from './config/load-config';
import { DatabaseModule } from './database/database.module';
import { InstrumentsModule } from './instruments/instruments.module';
import { SubjectsModule } from './subjects/subjects.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      load: [loadConfig],
      isGlobal: true
    }),
    DatabaseModule,
    InstrumentsModule,
    SubjectsModule,
    UsersModule
  ]
})
export class AppModule {}
