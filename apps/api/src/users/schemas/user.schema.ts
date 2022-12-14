import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { UserRole } from '@dnp/common/types';
import { HydratedDocument } from 'mongoose';

export const userRoles: UserRole[] = ['admin'];

@Schema({ strict: true, timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: userRoles })
  role: UserRole;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
