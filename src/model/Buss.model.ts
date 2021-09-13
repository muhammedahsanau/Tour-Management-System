
import { Schema, model } from 'mongoose';
import { IBUSS } from '../types/document/IBUSS';
const IBussSchema = new Schema(
  {
    BusName: { type: String  },
    BussSeats:{ type: String }, 
    BussBokingDates: { type: String },

  },
  { timestamps: true },
   
);
export const BUSSSchema = model<IBUSS>('IBUSS_Schema', IBussSchema);

// _id, BussName, BussSeats, BussBokingDates