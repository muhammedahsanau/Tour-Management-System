import { ISaveReqTour } from "../types/Request/Tour.request";
import { ISaveUpdateResBuss } from "../types/Response/Buss.response";
import { BussController } from "../controller/Buss.controller";
module.exports = async function (req: any, res: any, next: any) {

  try {
    //getting all the busses information so that we can get
    //the number of seats , so that we can apply the algorithm.
    const bussList: ISaveUpdateResBuss[] =
    await new BussController().getBussList();
    var seats = [];
    for (let index = 0; index < bussList.length; index++) {
      const element = bussList[index].BussSeats;
      var x = element;
      var y: number = +x;
      seats.push(y);
    }
  } catch (error) {
    next(error);
  }

  try {
    const tour: ISaveReqTour = req.body;
    // console.log(tour.NumberOfParticipants);
    var x: String = tour.NumberOfParticipants;
    //converting string to array
    var y: number = +x;
    // console.log("seats" + seats);
    console.log("getBusses(seats, y).length" + getBusses(seats, y).length);
    if(getBusses(seats, y).length > 0) {
     next()
    }
    else{
  
      res.status(404);
      res.send('Sorry, There is no buss available or the Number Of Participants are greater then our busses capacity');
    }

  } catch (error) {
    next(error);
  }

  return res;
};


// the following function accepts the array of ...
// numOfSeats with the number of particepents ...
// and returns the busses
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
