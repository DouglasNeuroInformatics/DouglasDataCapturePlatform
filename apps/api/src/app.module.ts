import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot('mongodb://localhost:27017'), 
    SubjectsModule
  ]
})
export class AppModule {}
