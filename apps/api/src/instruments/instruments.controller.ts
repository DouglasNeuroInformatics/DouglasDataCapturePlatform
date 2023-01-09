import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { InstrumentDto } from './dto/instrument.dto';
import { InstrumentsService } from './instruments.service';

@ApiTags('Instruments')
@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @ApiOperation({ summary: 'Create an Instrument' })
  @Post()
  create(@Body() dto: InstrumentDto): Promise<InstrumentDto> {
    return this.instrumentsService.create(dto);
  }

  /*

  @ApiOperation({
    description: 'Get all instruments',
    summary: 'Get All'
  })
  @Get()
  @ApiOkResponse({ description: 'Success' })
  getAll(): Promise<CreateInstrumentResDto[]> {
    return this.instrumentsService.getAll();
  }
  */
}
