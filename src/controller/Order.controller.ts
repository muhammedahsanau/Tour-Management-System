import { IORDER } from '../types/document/IORDER';
import { MainOrder } from '../repositories/Order.repositories';
import CustomeError from '../utills/error';
import { Get, Route, Tags, Post, Body, Path, Put, Delete, SuccessResponse,Security } from "tsoa";
import { SaveUpdateResOrder } from '../types/Response/Order.responce'; 
import { DeleteOrder, GetOrder, SaveReqOrder, UpdateReqOrder,SearchReqOrder,updateOrder_readyOrDelivered,GetOrderByStatus } from '../types/Request/Order.request';

@Route('orders')
@Tags('PMS - Orders')
// @Security('api_key')
export class OrderController {
  constructor() { }

 
  /**@summary Get Single Order by order id => Only Login Waiter is allowed */
  @Security('api_key')
  @Post("/getorderById")
  async getorder(@Body() getreq:GetOrder): Promise<SaveUpdateResOrder> {
    const admin= await new MainOrder().getOrder(getreq.id);
    if (admin === null) throw new CustomeError(404, 'Order not found');
    return <SaveUpdateResOrder>admin;
  }

  
  /**@summary Take order from the customer => Only Login Waiter is allowed */
  @Security('api_key')
  @Post('/PlaceNewOrder')
  async saveorder(@Body() order: SaveReqOrder): Promise<SaveUpdateResOrder> {  
  const  new_admin = await new MainOrder().saveOrder(<IORDER>(order));
    return <SaveUpdateResOrder>(new_admin);
  }


    /**@summary Get All the orders taken by current waiter => Only Login Waiter is allowed */
    @Security('api_key') 
    @Post('/getMyOrderlistByWaiterId')
    async getorderListByWaiterId(): Promise<SaveUpdateResOrder[]> {
      const admin: IORDER[] = await new MainOrder().getOrderslistByWaiterId();
      if (admin === null) throw new CustomeError(404, 'Order not found');
      return <SaveUpdateResOrder[]>(admin);
    }

  /**@summary Update Order by order Id => Only Login Waiter is allowed */
  @Security('api_key')
  @Put('/updateorder')
  async updateOrder(@Body() admin: UpdateReqOrder): Promise<SaveUpdateResOrder> {
    const update_admin = await new MainOrder().updateOrder(<IORDER>(admin));
    if (update_admin === null)
      throw new CustomeError(400, 'order not updated');
    return <SaveUpdateResOrder>update_admin;
  }


    /**@summary ordate order status to Delivered => Only Login Waiter is allowed */
    @Security('api_key') 
    @Put('/updateOrderToDelivered')
    @SuccessResponse("200","product updated")
    async updateOrderToDelivered(@Body() delreq: updateOrder_readyOrDelivered) {
      return await new MainOrder().update_toDelivered(delreq.id);
    }

      /**@summary Update order to ready => Only Login admin is allowed */
  @Security('api_key') 
  @Put('/updateOrderToReady')
  @SuccessResponse("200","product updated")
  async updateOrderToReady(@Body() delreq: updateOrder_readyOrDelivered): Promise<any> {

    return await new MainOrder().update_toReady(delreq.id);
  }



  /**@summary Get list of all the orders => Only Login admin is allowed */
  @Security('api_key') 
  @Post('/getorderlist')
  async getorderList(): Promise<SaveUpdateResOrder[]> {
    const admin: IORDER[] = await new MainOrder().getOrderslist();
    if (admin === null) throw new CustomeError(404, 'Order not found');

    return <SaveUpdateResOrder[]>(admin);
  } 
  
  
  
  /**@summary Get all the orders contain certain item => Only Login admin is allowed */
  @Security('api_key') 
  @Post('/getorderbyItemID')
  async searchorderByproduct(@Body() getreq:SearchReqOrder): Promise<SaveUpdateResOrder[]> {
    const admin: IORDER[] = await new MainOrder().getOrdersbyProductID(getreq.item);

    return <SaveUpdateResOrder[]>(admin);
  }



  // /** 
  // @summary Get Single Item By Item Id => Only Login Waiter is allowed 
  // */
  // //get order by quantity
  // @Security('api_key') 
  // @Post('/getorderbyOrderQuantity')
  // async searchorderByquantity(@Body() getreq:SearchReqQuantity): Promise<SaveUpdateResOrder[]> {
  //   const admin: IORDER[] = await new MainOrder().getOrdersbyOrderQuantity(getreq.o_quantity);

  //   return <SaveUpdateResOrder[]>(admin);
  // }



  /** @summary Get Single Item By Item Id => Only Login Waiter is allowed */
  @Security('api_key')
  @Post("/getOrderByStatus")
  async getorderByStatus(@Body() getreq:GetOrderByStatus): Promise<SaveUpdateResOrder[]> {
    const admin:IORDER[]= await new MainOrder().getOrderByStatus(getreq.o_status);
    if (admin === null) throw new CustomeError(404, 'Order not found');

    return <SaveUpdateResOrder[]>admin;
  }
  // //save order
  // @Post('/saveorder')
  // async saveorder(@Body() order: SaveReqOrder): Promise<SaveUpdateResOrder> {
  //   const new_admin:IORDER = await new MainAdmin().saveOrder(<IORDER>(order));
  //   return <SaveUpdateResOrder>(new_admin);
  // }

  //update order
  // @Put('/updateorder')
  // async updateorder(@Body() admin: UpdateReqOrder): Promise<SaveUpdateResOrder> {
  //   const update_admin = await new MainAdmin().updateOrder(<IORDER>(admin));
  //   if (update_admin === null)
  //     throw new CustomeError(400, 'order not updated');
  //   return <SaveUpdateResOrder>update_admin;
  // }


  // //delete order
  // @Delete('/deleteorder')
  // @SuccessResponse("200","product deleted")
  // async deletorder(@Body() delreq: DeleteOrder) {
  //   return await new MainOrder().deletOrder(delreq.id);
  // }


  //get list of all orders
  // @Post('/getorderlist')
  // async getorderList(): Promise<SaveUpdateResOrder[]> {
  //   const admin: IORDER[] = await new MainOrder().getOrderslist();
  //   if (admin === null) throw new CustomeError(404, 'Order not found');
  //   return <SaveUpdateResOrder[]>(admin);
  // }


  //get order by product id
  // @Post('/getorderbyProductID')
  // async searchorderByproduct(@Body() getreq:SearchReqOrder): Promise<SaveUpdateResOrder[]> {
  //   const admin: IORDER[] = await new MainOrder().getOrdersbyProductID(getreq.item);
  //   return <SaveUpdateResOrder[]>(admin);
  // }

    // //get order by quantity
    // @Post('/getorderbyOrderQuantity')
    // async searchorderByquantity(@Body() getreq:SearchReqQuantity): Promise<SaveUpdateResOrder[]> {
    //   const admin: IORDER[] = await new MainOrder().getOrdersbyOrderQuantity(getreq.o_quantity);
    //   return <SaveUpdateResOrder[]>(admin);
    // }
}
