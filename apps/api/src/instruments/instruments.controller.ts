import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateInstrumentReqDto, CreateInstrumentResDto } from './dto/create-instrument.dto';
import { InstrumentsService } from './instruments.service';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Post()
  create(@Body() dto: CreateInstrumentReqDto): Promise<CreateInstrumentResDto> {
    return this.instrumentsService.create(dto);
  }

  @Get()
  getAll(): Promise<CreateInstrumentResDto[]> {
    return this.instrumentsService.getAll();
  }
}
