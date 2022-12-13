import { createHash } from 'node:crypto';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { StringUtils } from '@dnp/common/utils';
import { Model } from 'mongoose';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject, SubjectDocument } from './schemas/subject.schema';

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>) {}

  findAll(): Promise<Subject[]> {
    return this.subjectModel.find().exec();
  }

  async findOne(id: string): Promise<Subject> {
    const subject = await this.subjectModel.findById(id).exec();
    if (!subject) {
      throw new NotFoundException();
    }
    return subject;
  }

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subjectId = this.generateSubjectId(
      createSubjectDto.firstName,
      createSubjectDto.lastName,
      createSubjectDto.dateOfBirth
    );
    if (await this.subjectModel.exists({ _id: subjectId })) {
      throw new BadRequestException('Subject already registered in database');
    }
    return this.subjectModel.create({ _id: subjectId, ...createSubjectDto });
  }

  async delete(id: string): Promise<Subject> {
    const deletedSubject = await this.subjectModel.findByIdAndDelete(id).exec();
    if (!deletedSubject) {
      throw new NotFoundException();
    }
    return deletedSubject;
  }

  private generateSubjectId(firstName: string, lastName: string, dateOfBirth: Date): string {
    console.log(typeof dateOfBirth);
    const shortDateOfBirth = dateOfBirth.toISOString().split('T')[0];
    const source = StringUtils.sanitize(firstName + lastName) + StringUtils.sanitize(shortDateOfBirth, true);
    return createHash('sha256').update(source).digest('hex');
  }
}
