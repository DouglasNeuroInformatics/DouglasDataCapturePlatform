import { Controller, Get, Post, Body } from '@nestjs/common';

import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { InstrumentsService } from './instruments.service';
import { Instrument } from './schemas/instrument.schema';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Post()
  create(@Body() createInstrumentDto: CreateInstrumentDto): Promise<Instrument> {
    return this.instrumentsService.create(createInstrumentDto);
  }

  @Get()
  findAll(): Promise<Instrument[]> {
    return this.instrumentsService.findAll();
  }
}
