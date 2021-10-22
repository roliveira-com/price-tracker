import { Date, ObjectId } from "mongoose";

export interface IQuotation {
  _id?: ObjectId;
  produto: ObjectId;
  nome: string;
  foto: string; 
  price: string;
  createdAt?: Date;
  updatedAt?: Date;
}