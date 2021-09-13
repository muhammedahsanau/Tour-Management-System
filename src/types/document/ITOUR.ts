import { Document } from "mongoose";
export interface ITOUR extends Document {
  _id: string,
  ManagerName: string,
  Destination: string,
  NumberOfParticipants: string,
  Busses: string[],
  TourStartDate: string,
  TourEndDate: string,
  createdAt?: string;
  updatedAt?: string;
}
