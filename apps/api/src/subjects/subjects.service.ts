import { createHash } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { StringUtils } from '@dnp/common/utils';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from './schemas/subject.schema';
import { SubjectsRepository } from './subjects.repository';

@Injectable()
export class SubjectsService {
  constructor(private readonly subjectsRepository: SubjectsRepository) {}

  findAll(): Promise<Subject[]> {
    return this.subjectsRepository.findAll();
  }

  findById(id: string): Promise<Subject> {
    return this.subjectsRepository.findById(id);
  }

  create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subjectId = this.generateSubjectId(
      createSubjectDto.firstName,
      createSubjectDto.lastName,
      createSubjectDto.dateOfBirth
    );
    return this.subjectsRepository.create({ _id: subjectId, ...createSubjectDto });
  }

  deleteById(id: string): Promise<void> {
    return this.subjectsRepository.deleteById(id);
  }

  private generateSubjectId(firstName: string, lastName: string, dateOfBirth: Date): string {
    const shortDateOfBirth = dateOfBirth.toISOString().split('T')[0];
    const source = StringUtils.sanitize(firstName + lastName) + StringUtils.sanitize(shortDateOfBirth, true);
    return createHash('sha256').update(source).digest('hex');
  }
}
