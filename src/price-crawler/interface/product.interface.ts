import { ObjectId } from "mongoose";
import { ISelectedStore } from "./store.interface";

export interface IProductCreate {
  foto: string;
  sku: string;
  nome: string;
  url: string;
  precoInicial: string;
}

export interface IProduct {
  _id?: ObjectId,
  foto: string;
  sku: string;
  nome: string;
  url: string;
  loja: ISelectedStore
  precoInicial: string;
}