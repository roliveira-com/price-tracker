import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema()
export class Store {
  @Prop()
  storeName: string

  @Prop()
  storeId: string

  @Prop()
  logo: string;

  @Prop()
  site: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);