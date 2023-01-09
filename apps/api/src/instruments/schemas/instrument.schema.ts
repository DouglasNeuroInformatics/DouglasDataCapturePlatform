import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { InstrumentFieldType } from '../instruments.enums';
import { InstrumentFieldInterface } from '../interfaces/instrument-field.interface';
import { InstrumentInterface } from '../interfaces/instrument.interface';

@Schema({ strict: true })
export class InstrumentField implements InstrumentFieldInterface {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  isRequired: boolean;

  @Prop({ enum: InstrumentFieldType, required: true })
  type: string;
}

@Schema({ strict: true, timestamps: true })
export class Instrument implements InstrumentInterface {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  instructions: string;

  @Prop({ required: false })
  estimatedDuration: number;

  @Prop({ required: true })
  fields: InstrumentField[];
}

export type InstrumentDocument = HydratedDocument<Instrument>;

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
