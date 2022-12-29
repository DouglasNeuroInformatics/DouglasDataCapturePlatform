import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { InstrumentFieldInterface, InstrumentFieldType, InstrumentInterface } from '@dnp/common';
import { HydratedDocument } from 'mongoose';

@Schema({ strict: true })
export class InstrumentField implements InstrumentFieldInterface {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  isRequired: boolean;

  @Prop({ enum: Object.values(InstrumentFieldType), required: true })
  type: InstrumentFieldType;
}

@Schema({ strict: true, timestamps: true })
export class Instrument implements InstrumentInterface {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  instructions: string;

  @Prop({ required: true })
  fields: InstrumentField[];
}

export type InstrumentDocument = HydratedDocument<Instrument>;

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
