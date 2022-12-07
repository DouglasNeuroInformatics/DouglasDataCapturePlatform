import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateSubjectDto, Diagnosis } from './dto/create-subject.dto';
import { SubjectsFilterDto } from './dto/subjects-filter.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { Subject } from './subject.model';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Get()
  find(@Query() filterDto: SubjectsFilterDto): Subject[] {
    if (Object.keys(filterDto).length > 0) {
      return this.subjectsService.findWithFilters(filterDto);
    }
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Subject {
    return this.subjectsService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.subjectsService.delete(id);
  }

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto): Subject {
    const { firstName, lastName } = createSubjectDto;
    return this.subjectsService.create(firstName, lastName);
  }

  @Patch(':id/dx')
  updateDiagnosis(@Param('id') id: string, @Body() updateDiagnosisDto: UpdateDiagnosisDto): Subject {
    return this.subjectsService.updateDiagnosis(id, updateDiagnosisDto.dx);
  }
}
