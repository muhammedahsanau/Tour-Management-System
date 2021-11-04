
import { ISaveUpdateResBuss } from "../types/Response/Buss.response";
import { BussController } from "../controller/Buss.controller";
import { ITOUR } from '../types/document/ITOUR';
import { MainTour } from '../repositories/Tour.repositories';
import CustomeError from '../utills/error';
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse,Security } from "tsoa";
import { ISaveUpdateResTour } from '../types/Response/Tour.response'; 
import {  ISaveReqTour } from '../types/Request/Tour.request';


@Route('Tour')
@Tags('TMS - Tours')
export class TourController {
  constructor() { }

  /**@summary Save a New Tour */
  @Post('/saveTour')
  async saveTour(@Body() tour: ISaveReqTour,): Promise<ISaveUpdateResTour> {

    const bussList: ISaveUpdateResBuss[] =
    await new BussController().getBussList();
    var seatsFromSavedBusses = [];
    for (let index = 0; index < bussList.length; index++) {
      const element = bussList[index].BussSeats;
      var x = element;
      var y: number = +x;
      seatsFromSavedBusses.push(y);
    }
    // console.log(tour.NumberOfParticipants);
    var x: String = tour.NumberOfParticipants;
    //converting string to array
    var l: number = +x;
    let SeatsArray:any = getBusses(seatsFromSavedBusses,l)[0]
    
    console.log(getBusses(seatsFromSavedBusses,l));
    console.log(SeatsArray);
    const idsOfBusses = []

   for (let bussindex = 0; bussindex < bussList.length; bussindex++) {
      
       var x = bussList[bussindex].BussSeats
       
       var noOfbussSeat: number = +x;
       for (let index = 0; index < SeatsArray.length; index++) {
         const noOfSeatWeNeed = SeatsArray[index];
         if (noOfbussSeat==noOfSeatWeNeed) {
          idsOfBusses.push(bussList[index]._id)
            SeatsArray[index] = "null"
          // bussList[bussindex].BussSeats = "null"
        }  
       }    
   }
    const newTour:any = await new MainTour().saveTour(<ITOUR>(tour),<string[]>idsOfBusses);
    return <ISaveUpdateResTour>(newTour.populate("Busses","-createdAt -updatedAt"));

  // This function is used to get the array og the busses .
  function getBusses(array: any, sum: any) {
    function split(first = 0, second = 0, arr = []) {
      if (second === sum) {
        result.push(arr);
        return;
      }
      if (first === array.length) {
        return;
      }
      if (second + array[first] <= sum) {
        split(first + 1, second + array[first], arr.concat(array[first]));
      }
      split(first + 1, second, arr);
    }
    var result: any = [];
    split();
    return result;
  }
  }





  
 
}
