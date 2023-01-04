import { createHash } from 'node:crypto';

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { StringUtils, SubjectPostRequestDto } from '@dnp/common';

import { Subject } from './schemas/subject.schema';
import { SubjectsRepository } from './subjects.repository';

@Injectable()
export class SubjectsService {
  constructor(private readonly subjectsRepository: SubjectsRepository) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectsRepository.findAll();
  }

  async findById(id: string): Promise<Subject> {
    const subject = await this.subjectsRepository.findById(id);
    if (!subject) {
      throw new NotFoundException();
    }
    return subject;
  }

  async create(dto: SubjectPostRequestDto): Promise<Subject> {
    const subjectId = this.generateSubjectId(dto.firstName, dto.lastName, dto.dateOfBirth);
    if (await this.subjectsRepository.exists({ _id: subjectId })) {
      throw new ConflictException('A subject with the provided demographic information already exists');
    }
    return this.subjectsRepository.create({ _id: subjectId, ...dto });
  }

  async deleteById(id: string): Promise<void> {
    const deleted = await this.subjectsRepository.deleteById(id);
    if (!deleted) {
      throw new NotFoundException();
    }
  }

  private generateSubjectId(firstName: string, lastName: string, dateOfBirth: Date): string {
    const shortDateOfBirth = dateOfBirth.toISOString().split('T')[0];
    const source = StringUtils.sanitize(firstName + lastName) + StringUtils.sanitize(shortDateOfBirth, true);
    return createHash('sha256').update(source).digest('hex');
  }
}