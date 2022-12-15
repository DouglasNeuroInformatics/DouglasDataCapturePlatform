import { createHash } from 'node:crypto';

import { Injectable, NotFoundException } from '@nestjs/common';

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

  async findById(id: string): Promise<Subject> {
    const subject = await this.subjectsRepository.findById(id);
    if (!subject) {
      throw new NotFoundException();
    }
    return subject;
  }

  create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subjectId = this.generateSubjectId(
      createSubjectDto.firstName,
      createSubjectDto.lastName,
      createSubjectDto.dateOfBirth
    );
    return this.subjectsRepository.create({ _id: subjectId, ...createSubjectDto });
  }

  async deleteById(id: string): Promise<void> {
    const deleted = await this.subjectsRepository.deleteById(id);
    if (!deleted) {
      throw new NotFoundException()
    }
  }

  private generateSubjectId(firstName: string, lastName: string, dateOfBirth: Date): string {
    const shortDateOfBirth = dateOfBirth.toISOString().split('T')[0];
    const source = StringUtils.sanitize(firstName + lastName) + StringUtils.sanitize(shortDateOfBirth, true);
    return createHash('sha256').update(source).digest('hex');
  }
}
