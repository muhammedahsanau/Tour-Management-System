import { TOURSchema } from '../model/Tour.model';  
import { ITOUR } from '../types/document/ITOUR';
export class MainTour {
  constructor() {}
 
  saveTour(buss: ITOUR,seatsArray:string[]) {
    // todo
    //  var l: number = +seatsArray;
       buss.Busses = seatsArray
    return new TOURSchema(buss).save();
  }
  


 
}
