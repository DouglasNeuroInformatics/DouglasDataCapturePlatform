import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { Sex, SubjectType } from '@dnp/common/types';
import { HydratedDocument } from 'mongoose';

@Schema({ strict: true, timestamps: true })
export class Subject implements SubjectType {
  @ApiProperty()
  @Prop({ required: true })
  _id: string;

  @ApiProperty()
  @Prop({ required: true, trim: true })
  firstName: string;

  @ApiProperty()
  @Prop({ required: true, trim: true })
  lastName: string;

  @ApiProperty()
  @Prop({ required: true })
  dateOfBirth: Date;

  @ApiProperty()
  @Prop({ required: true, enum: ['male', 'female'] })
  sex: Sex;
}

export type SubjectDocument = HydratedDocument<Subject>;

export const SubjectSchema = SchemaFactory.createForClass(Subject);
