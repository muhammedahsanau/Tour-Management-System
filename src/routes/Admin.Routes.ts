import express from "express";
import { AdminController } from "../controller/Admin.controller";
import { IADMIN } from "../types/document/IADMIN";
import { OrderController } from "../controller/Order.controller";
import { SaveReqAdmin, GetAdmin } from "../types/Request/Admin.request";
import { SaveUpdateResAdmin } from "../types/Response/Admin.responce";
import { SaveUpdateResOrder } from "../types/Response/order.responce";
import { SaveUpdateResWaiter } from "../types/Response/waiter.responce";
import { SaveReqWaiter, GetWaiter } from "../types/Request/waiter.request";
import { SaveUpdateResItem } from "../types/Response/Item.responce";
import CustomeError from "../utills/error";
const WaiterAuth = require("../middlewares/WaiterAuth");
const AdminAuth = require("../middlewares/AdminAuth");
const bcrypt = require("bcrypt");
require("dotenv").config();
import {
  GetOrderByStatus,
  DeleteOrder,
  updateOrder_readyOrDelivered,
  SaveReqOrder,
  UpdateReqOrder,
  SearchReqOrder,
} from "../types/Request/order.request";
import {
  DeleteItem,
  GetItem,
  SaveReqItem,
  UpdateReqItem,
  search,
  getItemPrice,
} from "../types/Request/Item.request";
const jwt = require("jsonwebtoken");


export class AdminRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }



  routes() {


    // this.router.post("/saveItemInMenu", AdminAuth, async (req, res, next) => {
    //   try {
    //     const admin: SaveReqItem = req.body;
    //     const newAdmin: SaveUpdateResItem =
    //       await new AdminController().saveItem(admin);
    //     res.status(200).json({
    //       message: newAdmin,
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });



    // this.router.put("/updateItemInMenu", AdminAuth, async (req, res, next) => {
    //   try {
    //     const admin: UpdateReqItem = req.body;
    //     const upadated_admin: SaveUpdateResItem =
    //       await new AdminController().updateItem(admin);
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



    // this.router.delete("/deleteItem", AdminAuth, async (req, res, next) => {
    //   try {
    //     const delreq: DeleteItem = req.body;
    //     const Deleted_admin = await new AdminController().deletItem(delreq);
    //     res.status(200).json({
    //       message: "item deleted",
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });



    this.router.post("/RegisterAdmin", async (req, res, next) => {
      try {
        const admin: SaveReqAdmin = req.body;
        const salt = await bcrypt.genSalt(10);
        admin.admin_password = await bcrypt.hash(admin.admin_password, salt);
        const newAdmin: SaveUpdateResAdmin =
          await new AdminController().saveAdmin(admin);
        res.status(200).json({
          message: newAdmin,
        });
      } catch (error) {
        next(error);
      }
    });



    this.router.post("/adminlogin", async (req, res, next) => {
      try {
        const getreq: GetAdmin = req.body;
        const admin: SaveUpdateResAdmin = await new AdminController().authAdmin(
          getreq
        );
        const ACCESS_TOKEN_SECRET: string = "AdminAccessKey";
        const accessToken = jwt.sign(
          { admin_email: admin.admin_email, admin_id: admin._id },
          ACCESS_TOKEN_SECRET
        );
        res.header("token", accessToken);
        res.send(admin);
      } catch (error) {
        next(error);
      }
    });



    // this.router.post("/Registerwaiter", AdminAuth, async (req, res, next) => {
    //   try {
    //     const waiter: SaveReqWaiter = req.body;
    //     const salt = await bcrypt.genSalt(10);
    //     waiter.waiter_password = await bcrypt.hash(
    //       waiter.waiter_password,
    //       salt
    //     );
    //     var newAdmin: SaveUpdateResWaiter =
    //       await new AdminController().saveWaiter(waiter);
    //     res.status(200).json({
    //       message: newAdmin,
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // }
    // );



  }
}
export const AdminRoutesApi = new AdminRoutes().router;
