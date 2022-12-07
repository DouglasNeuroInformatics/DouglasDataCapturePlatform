import { createHash } from 'node:crypto';

import { StringUtils } from '@dnp/common/utils';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Diagnosis } from './dto/create-subject.dto';
import { SubjectsFilterDto } from './dto/subjects-filter.dto';
import { Subject } from './subject.model';

@Injectable()
export class SubjectsService {
  private subjects: Subject[] = [];

  findAll(): Subject[] {
    return this.subjects;
  }

  findWithFilters(filterDto: SubjectsFilterDto): Subject[] {
    const subjects = [...this.findAll()];
    console.log(subjects);
    return subjects.filter((subj) => subj.dx === filterDto.dx);
  }

  findOne(id: string): Subject {
    const subject = this.subjects.find((subject) => subject._id === id);
    if (!subject) {
      throw new NotFoundException();
    }
    return subject;
  }

  create(firstName: string, lastName: string): Subject {
    const subject: Subject = {
      _id: this.generateSubjectId(firstName, lastName, new Date()),
      firstName: firstName,
      lastName: lastName
    };
    this.subjects.push(subject);
    return subject;
  }

  delete(id: string): void {
    this.subjects = this.subjects.filter((subject) => subject._id !== id);
  }

  updateDiagnosis(id: string, dx: Diagnosis): Subject {
    const subject = this.findOne(id);
    subject.dx = dx;
    return subject;
  }

  private generateSubjectId(firstName: string, lastName: string, dateOfBirth: Date): string {
    const shortDateOfBirth = dateOfBirth.toISOString().split('T')[0];
    const source = StringUtils.sanitize(firstName + lastName) + StringUtils.sanitize(shortDateOfBirth, true);
    return createHash('sha256').update(source).digest('hex');
  }
}
