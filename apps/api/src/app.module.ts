import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), SubjectsModule]
})
export class AppModule {}
