import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTimestampsConfig } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  conta: string;

  @Prop()
  nome: string;

  @Prop()
  email: string;

}

export const UserSchema = SchemaFactory.createForClass(User);