import express from "express";
import { TourController } from "../controller/Tour.controller";
import { ITOUR } from "../types/document/ITOUR";
import {ISaveReqTour} from "../types/Request/Tour.request";
import {ISaveUpdateResTour} from "../types/Response/Tour.response"
const checkAvailableBusses = require("../middlewares/Check.available.busses");



export class TourRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
 
    // The following route is used to Save a new tour. 
    this.router.post("/saveTour",checkAvailableBusses, async (req, res, next) => {
      try {
       console.log(req);
         
        const tour: ISaveReqTour = req.body;
        const newtour: ISaveUpdateResTour =
          await new TourController().saveTour(tour);
        res.status(200).json({
          message: newtour,
        });
      } catch (error) {
        next(error);
      }
    });

 



  
 
  }
}
export const TourRoutesApi = new TourRoutes().router;
