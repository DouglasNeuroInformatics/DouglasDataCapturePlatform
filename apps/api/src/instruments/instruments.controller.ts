import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';

import { CreateInstrumentRequestDto } from '@dnp/common';

import { InstrumentsService } from './instruments.service';
import { Instrument } from './schemas/instrument.schema';

import { ValidationPipe } from '@/validation/validation.pipe';

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
