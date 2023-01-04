import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateInstrumentReqDto, CreateInstrumentResDto } from './dto/create-instrument.dto';
import { InstrumentsService } from './instruments.service';

@ApiTags('instruments')
@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  create(@Body() dto: CreateInstrumentReqDto): Promise<CreateInstrumentResDto> {
    return this.instrumentsService.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Success' })
  getAll(): Promise<CreateInstrumentResDto[]> {
    return this.instrumentsService.getAll();
  }
}
