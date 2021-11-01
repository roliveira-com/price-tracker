import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  nome: string;

  @Prop()
  email: string;

  @Prop()
  telefone?: string;

  @Exclude()
  @Prop()
  senha?: string;

}

export const UserSchema = SchemaFactory.createForClass(User);