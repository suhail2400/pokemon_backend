import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class User extends Document {
  @Prop({ required: true, })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  verified_email: boolean;

  @Prop({ default: Date.now()})
  join_date: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);