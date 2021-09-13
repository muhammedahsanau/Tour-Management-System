import express from "express";
import { BussController } from "../controller/Buss.controller";
import { IBUSS } from "../types/document/IBUSS";
// const  UserAuth  =require("../middlewares/WaiterAuth") ;
// const  AdminAuth  =require("../middlewares/AdminAuth") ;
import {
  IDeleteBuss,
  ISaveReqBuss,
  IUpdateReqBuss,
} from "../types/Request/buss.Request";

import {ISaveUpdateResBuss} from "../types/Response/Buss.responce"
const WaiterAuth = require("../middlewares/WaiterAuth");



export class BussRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    //the following route is used to get all the busses which are registered/Saved.
    this.router.post("/getAllBuss", async (req, res, next) => {
      try {
        const adminList: ISaveUpdateResBuss[] =
          await new BussController().getBussList();
        res.status(200).json({
          result: adminList,
        });
      } catch (error) {
        next(error);
      }
    });

    //the following route is used to Save a new buss. 
    this.router.post("/saveBuss", async (req, res, next) => {
      try {
        const admin: ISaveReqBuss = req.body;
        const newAdmin: ISaveUpdateResBuss =
          await new BussController().saveBuss(admin);
        res.status(200).json({
          message: newAdmin,
        });
      } catch (error) {
        next(error);
      }
    });


    //the following route is used to update an existing buss by providing its id.
    this.router.put("/updateBuss", async (req, res, next) => {
      try {
        const admin: IUpdateReqBuss = req.body;
        const upadated_admin: ISaveUpdateResBuss =
          await new BussController().updateBuss(admin);
        const response = {
          upadated_admin,
        };
        res.status(200).json({
          message: response,
        });
      } catch (error) {
        next(error);
      }
    });


    //the following route is used to Delete existing buss by its id.
    this.router.delete("/deleteBuss", async (req, res, next) => {
      try {
        const delreq: IDeleteBuss = req.body;
        const deleteBuss = await new BussController().deleteBuss(delreq);
        res.status(200).json({
          message: "Buss deleted",
        });
      } catch (error) {
        next(error);
      }
    });



 



  
 
  }
}
export const BussRoutesApi = new BussRoutes().router;
