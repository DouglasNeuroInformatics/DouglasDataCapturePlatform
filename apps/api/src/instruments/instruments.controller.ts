import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateInstrumentReqDto, CreateInstrumentResDto } from './dto/create-instrument.dto';
import { InstrumentsService } from './instruments.service';

@ApiTags('Instruments')
@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @ApiOperation({
    description: 'Create a new instrument',
    summary: 'Create'
  })
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @Post()
  create(@Body() dto: CreateInstrumentReqDto): Promise<CreateInstrumentResDto> {
    return this.instrumentsService.create(dto);
  }

  @ApiOperation({
    description: 'Get all instruments',
    summary: 'Get All'
  })
  @Get()
  @ApiOkResponse({ description: 'Success' })
  getAll(): Promise<CreateInstrumentResDto[]> {
    return this.instrumentsService.getAll();
  }
}
