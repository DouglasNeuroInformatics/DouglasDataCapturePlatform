import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';

import { InstrumentPostRequestDto, instrumentPostRequestSchema } from '@dnp/common';

import { InstrumentsService } from './instruments.service';
import { Instrument } from './schemas/instrument.schema';

import { ValidationPipe } from '@/validation/validation.pipe';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Post()
  @UsePipes(new ValidationPipe(instrumentPostRequestSchema))
  create(@Body() dto: InstrumentPostRequestDto): Promise<Instrument> {
    return this.instrumentsService.create(dto);
  }

  @Get()
  findAll(): Promise<Instrument[]> {
    return this.instrumentsService.findAll();
  }
}
