import { Schema, model } from "mongoose";
import { IBUSS } from "../types/document/IBUSS";
const IBussSchema = new Schema(
  {
    BusName: { type: String },
    BussSeats: { type: String },
    StartDate: { type: String },
    EndDate: { type: String },
  },
  { timestamps: true }
);
export const BUSSSchema = model<IBUSS>("IBUSS_Schema", IBussSchema);
