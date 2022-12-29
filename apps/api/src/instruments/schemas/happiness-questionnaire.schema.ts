import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

@Schema()
export class HappinessQuestionnaire {
  @Prop({ required: true })
  score: number;
}

export type HappinessQuestionnaireDocument = HydratedDocument<HappinessQuestionnaire>;

export const HappinessQuestionnaireSchema = SchemaFactory.createForClass(HappinessQuestionnaire);
