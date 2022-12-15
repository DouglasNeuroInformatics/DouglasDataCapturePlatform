import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { HappinessQuestionnaire } from './happiness-questionnaire.schema';

@Schema({ 
  discriminatorKey: 'kind',
  strict: true,
  timestamps: true
})
export class Instrument {
  @Prop({
    enum: [HappinessQuestionnaire.name],
    type: String
  })
  kind: string;
}

export type InstrumentDocument = HydratedDocument<Instrument>;

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
