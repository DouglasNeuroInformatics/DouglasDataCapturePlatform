import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SubjectPostRequestDto } from '@dnp/common';

import { Subject } from './schemas/subject.schema';
import { SubjectsService } from './subjects.service';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @ApiOperation({
    description: 'Get all subjects',
    summary: 'Get All'
  })
  @Get()
  findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @ApiOperation({
    description: 'Get a subject',
    summary: 'Get Subject'
  })
  @Get(':id')
  findById(@Param('id') id: string): Promise<Subject> {
    return this.subjectsService.findById(id);
  }

  @ApiOperation({
    description: 'Register a new subject in the database',
    summary: 'Create'
  })
  @Post()
  create(@Body() dto: SubjectPostRequestDto): Promise<Subject> {
    return this.subjectsService.create(dto);
  }

  @ApiOperation({
    description: 'Delete a subject from the database',
    summary: 'Delete'
  })
  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.subjectsService.deleteById(id);
  }
}
