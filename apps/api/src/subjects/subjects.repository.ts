import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { EntityRepository } from '../database/entity.repository';

import { Subject, SubjectDocument } from './schemas/subject.schema';

@Injectable()
export class SubjectsRepository extends EntityRepository<SubjectDocument> {
  constructor(@InjectModel(Subject.name) subjectModel: Model<SubjectDocument>) {
    super(subjectModel);
  }
}
