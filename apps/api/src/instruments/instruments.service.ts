import { ConflictException, Injectable, NotImplementedException } from '@nestjs/common';

import { InstrumentPostRequestDto } from '@dnp/common';

import { InstrumentsRepository } from './instruments.repository';
import { Instrument } from './schemas/instrument.schema';

@Injectable()
export class InstrumentsService {
  constructor(private readonly instrumentsRepository: InstrumentsRepository) {}

  findAll(): Promise<Instrument[]> {
    return this.instrumentsRepository.findAll();
  }

  findByName(): void {
    throw new NotImplementedException();
  }

  async create(dto: InstrumentPostRequestDto): Promise<Instrument> {
    if (await this.instrumentsRepository.exists({ title: dto.title })) {
      throw new ConflictException(`An instrument with the title '${dto.title}' already exists!`);
    }
    return this.instrumentsRepository.create(dto);
  }
}
