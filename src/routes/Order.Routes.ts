import express from 'express';
const userjwt = require("jsonwebtoken");
import { IORDER } from '../types/document/IORDER';
import { DeleteOrder, GetOrder, SaveReqOrder, UpdateReqOrder,SearchReqOrder,updateOrder_readyOrDelivered,GetOrderByStatus } from '../types/Request/order.request';
import { OrderController } from '../controller/Order.controller';
import { SaveUpdateResOrder } from '../types/Response/order.responce';
import CustomeError from '../utills/error';
const  UserAuth  =require("../middlewares/WaiterAuth") ;
const  AdminAuth  =require("../middlewares/AdminAuth") ;
const WaiterAuth = require("../middlewares/WaiterAuth");
export class OrderRoutes {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() { 
    this.router.post("/getorderById", WaiterAuth, async (req, res, next) => {
      try {
        const getreq: GetOrder = req.body;
        const Order: SaveUpdateResOrder = await new OrderController().getorder(
          getreq
        );
        res.send(Order);
      } catch (error) {
        next(error);
      }
    });



        //place new order for waiter 
        this.router.post("/PlaceNewOrder", WaiterAuth, async (req, res, next) => {
          try {
            const order: any = req.body;
                    const authHeader = req.header("Authorization");
                    const token = authHeader && authHeader.split(" ")[1];
                    if (!token) {
                      return res.sendStatus(401);
                    }
                    const ACCESS_TOKEN_SECRET: string =
                      "adhoashdoaisjfodmsovhsoevioseijvosmeoviwer3455ty54yrty5yDeleteProductGetproductSaveReqProductUpdateReqProductsearchgetProductPrice";
                    const decoded = userjwt.verify(token, ACCESS_TOKEN_SECRET);        
                    const waiter = decoded;
                    order.waiter=waiter.waiter_id
            const newOrder: SaveUpdateResOrder =
              await new OrderController().saveorder(order);       
            res.status(200).json({
              Order: newOrder,
            });
          } catch (error) {
            next(error);
          }
        });

        this.router.post("/getMyOrderlistByWaiterId", WaiterAuth, async (req, res, next) => {
          try {
            const authHeader = req.header("Authorization");
            const token = authHeader && authHeader.split(" ")[1];
            if (!token) {
              return res.sendStatus(401);
            }
            const ACCESS_TOKEN_SECRET: string =
              "adhoashdoaisjfodmsovhsoevioseijvosmeoviwer3455ty54yrty5yDeleteProductGetproductSaveReqProductUpdateReqProductsearchgetProductPrice";
            const decoded = userjwt.verify(token, ACCESS_TOKEN_SECRET);
    
            const waiter = decoded;
            const orderList: SaveUpdateResOrder[] =
              await new OrderController().getorderListByWaiterId();
            const new_order_list: SaveUpdateResOrder[] = [];
            for (let index = 0; index < orderList.length; index++) {
              if (waiter.waiter_id == orderList[index].waiter) {
                new_order_list.push(orderList[index]);
              }
            }
            res.status(200).json({
              result: new_order_list,
            });
          } catch (error) {
            next(error);
          }
        });
    // this.router.post('/getorderById', async (req, res, next) => {
    //   try {
    //     const getreq:GetOrder = req.body;
    //       const Order:SaveUpdateResOrder = await new OrderController().getorder(getreq);
    //       res.send(Order);
    //   } catch (error) {
    //     next(error);
    //   }  
    // });

    // this.router.post('/saveorder', async (req, res, next) => {
    //   try {
    //     const order: SaveReqOrder = req.body;
    //     const newOrder:SaveUpdateResOrder = await new OrderController().saveorder(order);
    //     res.status(200).json({
    //       message: newOrder
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });
    this.router.put('/updateorder', async (req, res, next) => {
      try {
        const order: UpdateReqOrder = req.body;
        const upadated_order:SaveUpdateResOrder = await new OrderController().updateOrder(order);
        const response = {
          upadated_order,
        };
        res.status(200).json({
          message: response
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.put(
      "/updateOrderToDelivered",
      WaiterAuth,
      async (req, res, next) => {
        try {
          const delreq: updateOrder_readyOrDelivered = req.body;
          const Deleted_order = await new OrderController().updateOrderToDelivered(
            delreq
          );
          res.status(200).json({
            message: "order updated to Delivered",
          });
        } catch (error) {
          next(error);
        }
      }
    );

    
    this.router.put(
      "/updateOrderToReady",
      AdminAuth,
      async (req, res, next) => {
        try {
          const delreq: updateOrder_readyOrDelivered = req.body;
          const Deleted_order = await new OrderController().updateOrderToReady(
            delreq
          );
          res.status(200).json({
            message: "order updated to ready",
          });
        } catch (error) {
          next(error);
        }
      }
    );



    this.router.post("/getorderlist", AdminAuth, async (req, res, next) => {
      try {
        const adminList: SaveUpdateResOrder[] =
          await new OrderController().getorderList();
        res.status(200).json({
          result: adminList,
        });
      } catch (error) {
        next(error);
      }
    });



    this.router.post("/getorderbyItemID", AdminAuth, async (req, res, next) => {
      try {
        const order: SearchReqOrder = req.body;
        const OrderList: SaveUpdateResOrder[] =
          await new OrderController().searchorderByproduct(order);
        res.status(200).json({
          result: OrderList,
        });
      } catch (error) {
        next(error);
      }
    });



    this.router.post("/getOrderByStatus", AdminAuth, async (req, res, next) => {
      try {
        const getreq: GetOrderByStatus = req.body;
        const Order: SaveUpdateResOrder[] =
          await new OrderController().getorderByStatus(getreq);
        res.send(Order);
      } catch (error) {
        next(error);
      }
    });

    // this.router.delete('/deleteorder', async (req, res, next) => {
    //   try {
    //     const delreq:DeleteOrder = req.body;
    //     const Deleted_order = await new OrderController().deletorder(delreq);
    //     res.status(200).json({
    //       message: 'order deleted'
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
    // });
    // this.router.post('/getorderlist', async (req, res, next) => {
    //   try {
    //     const adminList: SaveUpdateResOrder[] = await new OrderController().getorderList();
    //     res.status(200).json({
    //       result: adminList
    //     });

    //   } catch (error) {
    //     next(error);
    //   }
    // });
    // this.router.post('/getorderbyProductID', async (req, res, next) => {
    //   try {
    //     const order: SearchReqOrder = req.body;
    //     const adminList: SaveUpdateResOrder[] = await new OrderController().searchorderByproduct(order);
    //     res.status(200).json({
    //       result: adminList
    //     });

    //   } catch (error) {
    //     next(error);
    //   }
    // });

  }
}
export const OrderRoutesApi = new OrderRoutes().router;