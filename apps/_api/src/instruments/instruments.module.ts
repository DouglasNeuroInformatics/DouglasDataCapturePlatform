import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InstrumentsController } from './instruments.controller';
import { InstrumentsRepository } from './instruments.repository';
import { InstrumentsService } from './instruments.service';
import { Instrument, InstrumentSchema } from './schemas/instrument.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Instrument.name,
        schema: InstrumentSchema
      }
    ])
  ],
  controllers: [InstrumentsController],
  providers: [InstrumentsRepository, InstrumentsService]
})
export class InstrumentsModule {}