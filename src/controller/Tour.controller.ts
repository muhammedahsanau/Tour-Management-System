
import { ISaveUpdateResBuss } from "../types/Response/Buss.responce";
import { BussController } from "../controller/Buss.controller";
import { ITOUR } from '../types/document/ITOUR';
import { MainTour } from '../repositories/Tour.repositories';
import CustomeError from '../utills/error';
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse,Security } from "tsoa";
import { ISaveUpdateResTour } from '../types/Response/Tour.responce'; 
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
    var seats = [];
    for (let index = 0; index < bussList.length; index++) {
      const element = bussList[index].BussSeats;
      var x = element;
      var y: number = +x;
      seats.push(y);
    }
    // console.log(tour.NumberOfParticipants);
    var x: String = tour.NumberOfParticipants;
    //converting string to array
    var l: number = +x;
    let result:any = getBusses(seats,l)[0]
    console.log(result);
    const idsOfBusses = []

   for (let index = 0; index < bussList.length; index++) {
      
       var x = bussList[index].BussSeats
       var bussSeat: number = +x;

       for (let index = 0; index < result.length; index++) {
         const element = result[index];
         if (bussSeat==element) {
          idsOfBusses.push(bussList[index]._id)
          bussList[index].BussSeats = "0"
        }  
       }    
   }
    const newTour:any = await new MainTour().saveTour(<ITOUR>(tour),<string[]>idsOfBusses);
    return <ISaveUpdateResTour>(newTour);

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
