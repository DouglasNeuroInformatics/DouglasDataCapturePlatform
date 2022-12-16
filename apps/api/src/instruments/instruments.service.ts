import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateInstrumentDto } from '@dnp/common/dto';
import { UpdateInstrumentDto } from '@dnp/common/dto';

import { InstrumentsRepository } from './instruments.repository';
import { Instrument } from './schemas/instrument.schema';

@Injectable()
export class InstrumentsService {
  constructor(private readonly instrumentsRepository: InstrumentsRepository) {}

  create(createInstrumentDto: CreateInstrumentDto): Promise<Instrument> {
    return this.instrumentsRepository.create(createInstrumentDto)
  }

  findAll(): Promise<Instrument[]> {
    return this.instrumentsRepository.findAll()
  }

  // use generic type
  findAllOfKind(kind: string): Promise<Instrument[]> {
    return this.instrumentsRepository.find({ kind })
  }

  async update(id: string, updateInstrumentDto: UpdateInstrumentDto): Promise<Instrument> {
    const updatedInstrument = await this.instrumentsRepository.updateById(id, updateInstrumentDto);
    if (!updatedInstrument) {
      throw new NotFoundException()
    }
    return updatedInstrument;
  }
}
