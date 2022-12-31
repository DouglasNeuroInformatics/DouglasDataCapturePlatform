import { Body, Controller, Delete, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SubjectDto, subjectDtoSchema } from '@dnp/common';

import { Subject } from './schemas/subject.schema';
import { SubjectsService } from './subjects.service';

import { ValidationPipe } from '@/validation/validation.pipe';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Get()
  findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Subject> {
    return this.subjectsService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe(subjectDtoSchema))
  create(@Body() createSubjectDto: SubjectDto): Promise<Subject> {
    return this.subjectsService.create(createSubjectDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.subjectsService.deleteById(id);
  }
}
