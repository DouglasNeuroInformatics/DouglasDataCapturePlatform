import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from './schemas/subject.schema';
import { SubjectsService } from './subjects.service';

@ApiExtraModels(Subject)
@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The resource has been fetched and transmitted in the message body',
    type: [Subject]
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The resource has been fetched and transmitted in the message body'
  })
  findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Subject> {
    return this.subjectsService.findOne(id);
  }

  @Post()
  @ApiBody({ type: [CreateSubjectDto] })
  create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectsService.create(createSubjectDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Subject> {
    return this.subjectsService.delete(id);
  }
}
