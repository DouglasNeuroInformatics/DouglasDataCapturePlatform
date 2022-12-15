import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { EntityRepository } from '../database/entity.repository';

import { Instrument, InstrumentDocument } from './schemas/instrument.schema';

@Injectable()
export class InstrumentsRepository extends EntityRepository<InstrumentDocument> {
  constructor(@InjectModel(Instrument.name) instrumentModel: Model<InstrumentDocument>) {
    super(instrumentModel);
  }
}
