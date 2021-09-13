import { Schema, model } from "mongoose";
import { IBUSS } from "../types/document/IBUSS";
const IBussSchema = new Schema(
  {
    ManagerName: { type: String },
    Destination: { type: String },
    NumberOfParticipants: { type: String },
    Busses: [{ type: Schema.Types.ObjectId, ref: "IBUSS_Schema" }],
    TourStartDate: { type: String },
    TourEndDate: { type: String },
  },
  { timestamps: true }
);
export const TOURSchema = model<IBUSS>("ITOUR_Schema", IBussSchema);
