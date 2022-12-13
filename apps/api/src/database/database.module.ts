import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { DatabaseService } from './database.service';

function mongooseModuleFactory(configService: ConfigService): MongooseModuleFactoryOptions {
  const nodeEnv = configService.get<string>('NODE_ENV');
  const options: MongooseModuleFactoryOptions = {};
  switch (nodeEnv) {
    case undefined:
      throw new Error("Environment variable 'NODE_ENV' is undefined");
    case 'development':
      options.uri = configService.get<string>('MONGO_DEV_CONNECTION_URI');
      break;
    case 'production':
      throw new Error('NOT IMPLEMENTED');
    case 'test':
      options.uri = configService.get<string>('MONGO_TEST_CONNECTION_URI');
      break;
    default:
      throw new Error(`Invalid value for environment variable 'NODE_ENV': ${nodeEnv}`);
  }
  return options; // options items could be undefined!
}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: mongooseModuleFactory,
      inject: [ConfigService]
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
