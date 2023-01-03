import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateInstrumentRequestDto } from './dto/create-instrument.dto';
import { InstrumentsService } from './instruments.service';
import { Instrument } from './schemas/instrument.schema';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Post()
  create(@Body() dto: CreateInstrumentRequestDto): Promise<Instrument> {
    return this.instrumentsService.create(dto);
  }

  @Get()
  getAll(): Promise<Instrument[]> {
    return this.instrumentsService.getAll();
  }
}
