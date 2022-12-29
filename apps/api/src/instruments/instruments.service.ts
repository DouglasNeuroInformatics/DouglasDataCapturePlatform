
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateInstrumentRequestDto } from '@dnp/common';
import { UpdateInstrumentRequestDto } from '@dnp/common';

import { InstrumentsRepository } from './instruments.repository';
import { Instrument } from './schemas/instrument.schema';

@Injectable()
export class InstrumentsService {
  constructor(private readonly instrumentsRepository: InstrumentsRepository) {}

  create(createInstrumentDto: CreateInstrumentRequestDto): Promise<Instrument> {
    return this.instrumentsRepository.create(createInstrumentDto)
  }

  findAll(): Promise<Instrument[]> {
    return this.instrumentsRepository.findAll()
  }

  // use generic type
  findAllOfKind(kind: string): Promise<Instrument[]> {
    return this.instrumentsRepository.find({ kind })
  }

  async update(id: string, updateInstrumentDto: UpdateInstrumentRequestDto): Promise<Instrument> {
    const updatedInstrument = await this.instrumentsRepository.updateById(id, updateInstrumentDto);
    if (!updatedInstrument) {
      throw new NotFoundException()
    }
    return updatedInstrument;
  }
}
