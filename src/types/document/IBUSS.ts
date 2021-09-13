import { Document } from "mongoose";
export interface IBUSS extends Document {
  _id: string,
  BusName: string,
  BussSeats: string,
 StartDate: string ,
  EndDate: string ,
  createdAt?: string;
  updatedAt?: string;
}
