import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateInstrumentRequestDto } from './dto/create-instrument.dto';
import { Instrument, InstrumentDocument } from './schemas/instrument.schema';

@Injectable()
export class InstrumentsService {
  constructor(@InjectModel(Instrument.name) private instrumentModel: Model<InstrumentDocument>) {}

  create(dto: CreateInstrumentRequestDto): Promise<Instrument> {
    return this.instrumentModel.create(dto);
  }

  getAll(): Promise<Instrument[]> {
    return this.instrumentModel.find({}).exec();
  }
}
