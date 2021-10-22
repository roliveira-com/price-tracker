import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type QuotationDocument = Quotation & Document;

@Schema({ timestamps: true })
export class Quotation {
  @Prop()
  price: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  produto: ObjectId;
}

export const QuotationSchema = SchemaFactory.createForClass(Quotation);