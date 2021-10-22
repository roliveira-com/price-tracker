import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ISelectedStore } from '../interface/store.interface';

export type TrackingDocument = Tracking & Document;

@Schema({ timestamps: true })
export class Tracking {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
  produto: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop()
  nome: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  loja: ISelectedStore;
}

export const TrackingSchema = SchemaFactory.createForClass(Tracking);