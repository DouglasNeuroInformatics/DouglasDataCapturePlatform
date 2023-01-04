import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import Joi from 'joi';
import { DatabaseModule } from './database/database.module';

import { InstrumentsModule } from './instruments/instruments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_DEV_CONNECTION_URI: Joi.string().required(),
        MONGO_TEST_CONNECTION_URI: Joi.string().required(),
        NODE_ENV: Joi.string().valid('development', 'test').required(),
        PORT: Joi.number().required()
      })
    }),
    DatabaseModule,
    InstrumentsModule,
    UsersModule
  ]
})
export class AppModule {}
