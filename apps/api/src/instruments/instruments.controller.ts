import { Controller, Get, Post, Body } from '@nestjs/common';

import { CreateInstrumentRequestDto } from '@dnp/common/dto';

import { InstrumentsService } from './instruments.service';
import { Instrument } from './schemas/instrument.schema';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Post()
  create(@Body() createInstrumentDto: CreateInstrumentRequestDto): Promise<Instrument> {
    return this.instrumentsService.create(createInstrumentDto);
  }

  @Get()
  findAll(): Promise<Instrument[]> {
    return this.instrumentsService.findAll();
  }
}
