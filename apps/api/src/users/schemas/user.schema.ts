import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

@Schema({ strict: true, timestamps: true })
export class User {

  @Prop({ required: true, trim: true })
  username: string;

  @Prop({ required: true, trim: true })
  email: string;
  
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
