import { ObjectId } from "mongoose";
import { IProduct } from "./product.interface";
import { ISelectedStore } from "./store.interface";

export interface ITrackingCreate {
  loja: ISelectedStore;
  url: string;
  nome: string;
  produto: ObjectId;
  user: string;
}

export interface ITracking {
  _id?: ObjectId
  produto: IProduct | ObjectId;
  user: string;
  nome: string;
  loja: ISelectedStore;
  createdAt?: any;
  updatedAt?: any;
}