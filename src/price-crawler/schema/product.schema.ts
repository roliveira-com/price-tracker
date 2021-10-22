import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ISelectedStore } from '../interface/store.interface';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  foto: string;

  @Prop()
  sku: string;

  @Prop()
  precoInicial: string;

  @Prop({ type: SchemaTypes.Mixed })
  loja: ISelectedStore;

  @Prop()
  nome: string;

  @Prop()
  url: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);