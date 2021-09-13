import express from "express";
import { ItemController } from "../controller/Item.controller";
import { IITEM } from "../types/document/IITEM";
const  UserAuth  =require("../middlewares/WaiterAuth") ;
const  AdminAuth  =require("../middlewares/AdminAuth") ;
import {
  DeleteItem,
  GetItem,
  SaveReqItem,
  UpdateReqItem,
  search,
  getItemPrice,
} from "../types/Request/Item.request";
import { SaveUpdateResItem } from "../types/Response/Item.responce";
import CustomeError from "../utills/error";
const WaiterAuth = require("../middlewares/WaiterAuth");



export class ItemRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {


    this.router.post("/getItemByID", WaiterAuth, async (req, res, next) => {
      try {
        const getreq: GetItem = req.body;
        const admin: SaveUpdateResItem = await new ItemController().getItem(
          getreq
        );
        res.send(admin);
      } catch (error) {
        next(error);
      }
    });



    this.router.post("/getMenu", async (req, res, next) => {
      try {
        const adminList: SaveUpdateResItem[] =
          await new ItemController().getItemList();
        res.status(200).json({
          result: adminList,
        });
      } catch (error) {
        next(error);
      }
    });


    this.router.post("/saveItemInMenu", AdminAuth, async (req, res, next) => {
      try {
        const admin: SaveReqItem = req.body;
        const newAdmin: SaveUpdateResItem =
          await new ItemController().saveItem(admin);
        res.status(200).json({
          message: newAdmin,
        });
      } catch (error) {
        next(error);
      }
    });



    this.router.put("/updateItemInMenu", AdminAuth, async (req, res, next) => {
      try {
        const admin: UpdateReqItem = req.body;
        const upadated_admin: SaveUpdateResItem =
          await new ItemController().updateItem(admin);
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



    this.router.delete("/deleteItem", AdminAuth, async (req, res, next) => {
      try {
        const delreq: DeleteItem = req.body;
        const Deleted_admin = await new ItemController().deletItem(delreq);
        res.status(200).json({
          message: "item deleted",
        });
      } catch (error) {
        next(error);
      }
    });






    // this.router.post("/getMyOrderlistByWaiterId", WaiterAuth, async (req, res, next) => {
    //   try {
    //     const authHeader = req.header("Authorization");
    //     const token = authHeader && authHeader.split(" ")[1];
    //     if (!token) {
    //       return res.sendStatus(401);
    //     }
    //     const ACCESS_TOKEN_SECRET: string =
    //       "adhoashdoaisjfodmsovhsoevioseijvosmeoviwer3455ty54yrty5yDeleteProductGetproductSaveReqProductUpdateReqProductsearchgetProductPrice";
    //     const decoded = userjwt.verify(token, ACCESS_TOKEN_SECRET);

    //     const waiter = decoded;
    //     const orderList: SaveUpdateResOrder[] =
    //       await new WaiterController().getorderListByWaiterId();
    //     const new_order_list: SaveUpdateResOrder[] = [];
    //     for (let index = 0; index < orderList.length; index++) {
    //       if (waiter.waiter_id == orderList[index].waiter) {
    //         new_order_list.push(orderList[index]);
    //       }
    //     }
    //     res.status(200).json({
    //       result: new_order_list,
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });




    this.router.post("/getItemsbyPrice", async (req, res, next) => {
      try {
        const item: getItemPrice = req.body;
        const adminList: SaveUpdateResItem[] =
          await new ItemController().getItemByPrice(item);
        res.status(200).json({
          result: adminList,
        });
      } catch (error) {
        next(error);
      }
    });
    // this.router.post("/getItemByID", async (req, res, next) => {
    //   try {
    //     const getreq: GetItem = req.body;
    //     const admin: SaveUpdateResItem =
    //       await new ItemController().getItem(getreq);
    //     res.send(admin);
    //   } catch (error) {
    //     next(error);
    //   }
    // });

    // this.router.post("/saveItem", async (req, res, next) => {
    //   try {
    //     const admin: SaveReqItem = req.body;
    //     const newAdmin: SaveUpdateResItem =
    //       await new ItemController().saveItem(admin);
    //     res.status(200).json({
    //       message: newAdmin,
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });
    // this.router.put("/updateItem", async (req, res, next) => {
    //   try {
    //     const admin: UpdateReqItem = req.body;
    //     const upadated_admin: SaveUpdateResItem =
    //       await new ItemController().updateItem(admin);
    //     const response = {
    //       upadated_admin,
    //     };
    //     res.status(200).json({
    //       message: response,
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });
    // this.router.delete("/deleteItem", async (req, res, next) => {
    //   try {
    //     const delreq: DeleteItem = req.body;
    //     const Deleted_admin = await new ItemController().deletItem(
    //       delreq
    //     );
    //     res.status(200).json({
    //       message: "item deleted",
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });
    // this.router.post("/getItemlist", async (req, res, next) => {
    //   try {
    //     const adminList: SaveUpdateResItem[] =
    //       await new ItemController().getItemList();
    //     res.status(200).json({
    //       result: adminList,
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });
 
    // this.router.post("/getItemsbyPrice", async (req, res, next) => {
    //   try {
    //     const item: getItemPrice = req.body;
    //     const adminList: SaveUpdateResItem[] =
    //       await new ItemController().getItemByPrice(item);
    //     res.status(200).json({
    //       result: adminList,
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });
 
  }
}
export const ItemRoutesApi = new ItemRoutes().router;
